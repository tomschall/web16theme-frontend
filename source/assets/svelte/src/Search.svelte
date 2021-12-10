<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import SearchPageInput from './SearchPageInput.svelte';
	import SearchBarInput from './SearchBarInput.svelte';
	import SearchBarIntro from './SearchBarIntro.svelte';
	import SearchResults from './SearchResults.svelte';
	import SearchCategories from './SearchCategories.svelte';
	import SearchProposals from './SearchProposals.svelte';
	import { init, addMessages } from 'svelte-i18n';
	import en from './lang/en.json';
	import de from './lang/de.json';
	import { debounce } from 'lodash';
	import type { Item } from './definitions/Item';
	import type { CategoriesCount } from './definitions/Categories';

	addMessages('en', en);
	addMessages('de', de);

	init({
		fallbackLocale: 'de',
		initialLocale: document.documentElement.lang,
	});

	export let template: string = '';
	let searchQuery: string = '';
	let searchTerm: string = null;
	let searchTermSpellCheck: string = null;
	let noAlternativeSearchTermFound: boolean = false;
	let totalItems: number = null;
	let offset: number = 0;
	let limit: number = 10;
	let searchResults: Item[] = [];
	let searchResultsHighlighting: any;
	let showSearchBarIntro: boolean = true;
	let showSearchCategories: boolean = false;
	let showSearchProposals: boolean = false;
	let isLoading: boolean = false;
	let searchType: string = 'all';
	let observer: any;
	let target: any;
	let showStatusInfo: boolean = false;
	let isFirstSearch: boolean = true;
	let itemsCount: number = null;
	let categoriesCount: CategoriesCount;
	let urlParams = new URLSearchParams(window.location.search);

	let triggerSearchDebounced = debounce(async function (
		isFirstSearch: boolean
	) {
		await triggerSearch(isFirstSearch);
	},
	300);

	interface ObserverOptions {
		rootMargin: string;
		threshold: number;
	}

	const options: ObserverOptions = {
		rootMargin: '0px 0px 300px',
		threshold: 0,
	};

	const loadMoreResults = (entries: any) => {
		entries.forEach((entry: any) => {
			if (entry.isIntersecting) {
				if (!searchTerm || searchTerm.length < 4 || isFirstSearch) return;

				if (itemsCount < limit) {
					unobserve();
					return;
				}

				isLoading = true;

				if (offset + limit < totalItems) {
					offset += limit;
					limit = 20;
				}

				triggerSearchDebounced(false);
			}
		});
	};

	let unobserve = () => {
		observer.unobserve(target);
	};

	onMount(() => {
		if (template === 'searchpage') {
			observer = new IntersectionObserver(loadMoreResults, options);
			target = document.querySelector('.loading-indicator');
			if (urlParams.has('query')) {
				searchQuery = urlParams.get('query');
				searchType = urlParams.get('searchtype') || 'all';
				if (searchQuery && searchType) handleInput();
			}
		}
	});

	const handleInput: () => void = function () {
		console.log('template', template);
		noAlternativeSearchTermFound = false;
		if (observer) unobserve();
		isLoading = true;
		searchTermSpellCheck = null;

		triggerSearchDebounced(true);
	};

	const updateFacets: () => void = function () {
		const endpoint =
			window.location.hostname === 'localhost'
				? // @ts-ignore
				  API +
				  `?q=${searchTerm}&category=all&search_type[]=all&limit=${limit}&offset=${offset}`
				: `https://${window.location.hostname}/searchbar.json?q=${searchTerm}&category=all&search_type[]=all&limit=${limit}&offset=${offset}`;

		fetch(endpoint)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then((data) => {
				if (data) categoriesCount = data.facets[0].enable;
			});
	};

	const triggerSearch = async (isFirst: boolean) => {
		if (isFirst) {
			showSearchBarIntro = false;
			showSearchCategories = false;
			searchResults = [];
			totalItems = 0;
			offset = 0;
			limit = 10;
		}

		if (!searchTermSpellCheck) searchTerm = searchQuery.trim();

		showSearchProposals = true;

		if (!searchTerm) {
			showSearchBarIntro = true;
			showStatusInfo = false;
			showSearchProposals = false;
			isLoading = false;
			return;
		}

		if (searchTerm && searchTerm.length < 3) {
			showSearchBarIntro = false;
			showStatusInfo = false;
			showSearchCategories = false;
			isLoading = false;
			return;
		}

		const endpoint =
			window.location.hostname === 'localhost'
				? // @ts-ignore
				  API +
				  `?q=${searchTerm}&category=all&search_type[]=${
						searchType || 'all'
				  }&limit=${limit}&offset=${offset}`
				: `https://${
						window.location.hostname
				  }/searchbar.json?q=${searchTerm}&category=all&search_type[]=${
						searchType || 'all'
				  }&limit=${limit}&offset=${offset}`;

		fetch(endpoint)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then((data) => {
				itemsCount = data.items.length;
				totalItems = data.items_total;

				if (data.facets && data.facets.length && isFirst) {
					updateFacets();
				} else if (data.facets[0].enable[searchType]) {
					updateFacets();
					categoriesCount = data.facets[0].enable[searchType];
				}

				if (totalItems === 0 && !noAlternativeSearchTermFound) {
					searchTermSpellCheck = searchTerm;

					const spellCheckEndpoint: string =
						window.location.hostname === 'localhost'
							? // @ts-ignore
							  API_SPELLCHECK + `?term=${searchTermSpellCheck}`
							: `https://${window.location.hostname}/spellcheck/?term=${searchTermSpellCheck}`;

					fetch(spellCheckEndpoint)
						.then((response) => {
							if (!response.ok) {
								throw Error(response.statusText);
							}
							return response.json();
						})
						.then((data) => {
							if (!data.suggestions.length) {
								searchTermSpellCheck = null;
								noAlternativeSearchTermFound = true;
							} else {
								searchTerm = data.suggestions[0].value;
							}
						})
						.catch((e) => {
							console.log('An spellcheck error occured!', e);
							noAlternativeSearchTermFound = true;
						})
						.finally(() => {
							if (!noAlternativeSearchTermFound) triggerSearch(true);
						});
				}

				searchResults = [...searchResults, ...data.items];
				searchResultsHighlighting = {
					...searchResultsHighlighting,
					...data.highlighting,
				};

				if (isFirst) {
					searchResults = [...data.items];
					searchResultsHighlighting = {
						...data.highlighting,
					};
					isFirstSearch = false;
					if (template === 'searchpage') observer.observe(target);
				}

				if (searchResults.length > 0) {
					showSearchCategories = true;
					showStatusInfo = false;
				} else {
					showSearchCategories = false;
					showStatusInfo = true;
				}
			})
			.catch((e) => console.log('Oh no. An error occured!', e))
			.finally(() => {
				isLoading = false;
			});
	};
</script>

<div class="widg_search_svelte">
	{#if template === 'searchbar'}
		<SearchBarInput
			bind:query={searchQuery}
			bind:showSearchCategories
			bind:showSearchBarIntro
			bind:searchResults
			bind:showStatusInfo
			bind:showSearchProposals
			bind:searchTermSpellCheck
			bind:searchType
			{handleInput}
		/>
	{/if}
	{#if template === 'searchpage'}
		<SearchPageInput bind:query={searchQuery} {handleInput} />
	{/if}
	{#if showSearchBarIntro}
		<SearchBarIntro />
	{/if}
	<div class="search__results">
		<div
			class={template === 'searchbar'
				? 'widg_searchbar-bar__content custom-scrollbar'
				: 'widg_searchpage__content'}
		>
			<div class="search__cat">
				{#if showSearchCategories}
					<SearchCategories
						bind:categoriesCount
						bind:searchType
						bind:totalItems
						{template}
						triggerCategorySearch={() => triggerSearchDebounced(true)}
						{unobserve}
					/>
				{/if}
				{#if showSearchProposals}
					<SearchProposals
						bind:query={searchQuery}
						bind:searchType
						{handleInput}
					/>
				{/if}
				{#if showSearchCategories}
					<div class="widg_searchbar-bar__title">
						<p>{$_('searchresult_title')}</p>
					</div>
				{/if}
				{#if searchTermSpellCheck && !noAlternativeSearchTermFound && !showStatusInfo}
					<div class="widg__searchbar_autocomplete">
						<p>{$_('search_autocomplete_warning')} <b>{searchTerm}</b></p>
						<span
							>{$_('search_autocomlete_warning_2')}
							<b>"{searchTermSpellCheck}"</b></span
						>
					</div>
				{/if}
				<SearchResults
					results={searchResults}
					{searchResultsHighlighting}
					{isLoading}
					{template}
					{searchTerm}
					{searchType}
				/>
				{#if showStatusInfo && !searchTermSpellCheck}
					<div class="widg__searchbar_autocomplete">
						<p>{$_('search_no_results')}</p>
						<span>{$_('search_no_results_subtitle')}</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
