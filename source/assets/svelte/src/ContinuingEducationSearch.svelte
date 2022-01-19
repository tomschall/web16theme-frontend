<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import SearchInput from './SearchInput.svelte';
	import SearchResults from './SearchResults.svelte';
	import SearchProposals from './SearchProposals.svelte';
	import { init, addMessages } from 'svelte-i18n';
	import en from './lang/en.json';
	import de from './lang/de.json';
	import { debounce } from 'lodash';
	import type { Item } from './definitions/Item';
	import MultiSelectRow from './MultiSelectRow.svelte';

	addMessages('en', en);
	addMessages('de', de);

	init({
		fallbackLocale: 'de',
		initialLocale: document.documentElement.lang,
	});

	export let template: string = '';
	export let listingType = 'grid';

	let searchQuery: string = '';
	let searchTerm: string = null;
	let searchTermSpellCheck: string = null;
	let noAlternativeSearchTermFound: boolean = false;
	let totalItems: number = null;
	let offset: number = 0;
	let limit: number = 10;
	let searchResults: Item[] = [];
	let searchResultsHighlighting: any;
	let showSearchProposals: boolean = true;
	let isLoading: boolean = false;
	let searchType: string = 'continuing_education';
	let observer: any;
	let target: any;
	let showStatusInfo: boolean = false;
	let isFirstSearch: boolean = true;
	let itemsCount: number = null;
	let urlParams = new URLSearchParams(window.location.search);
	let lang: string = null;
	let selected_taxonomy_subjectarea = [];
	let selected_taxonomy_eduproducttype = [];
	let selected_city = [];

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

	let setLanguage = (langStr: string) => {
		switch (langStr) {
			case 'en': {
				lang = langStr;
			}
			case 'de': {
				lang = langStr;
			}
			default: {
				let language = document.documentElement.lang;
				if (language === 'en' || language === 'de') {
					lang = document.documentElement.lang;
				} else {
					lang = 'de';
				}
			}
		}
	};

	onMount(() => {
		setLanguage(window.location.href.split('/')[3]);
		if (template === 'continuing_education') {
			document.title = $_('searchpage_title');
			observer = new IntersectionObserver(loadMoreResults, options);
			target = document.querySelector('.loading-indicator');
			if (urlParams.has('query')) {
				searchQuery = urlParams.get('query');
				searchType = urlParams.get('searchtype') || 'continuing_education';
				if (searchQuery && searchType) handleInput();
			}
		}
	});

	const handleInput: () => void = function () {
		noAlternativeSearchTermFound = false;
		if (observer) unobserve();
		isLoading = true;
		searchTermSpellCheck = null;

		triggerSearchDebounced(true);
	};

	const triggerSearch = async (isFirst: boolean) => {
		if (isFirst) {
			searchResults = [];
			totalItems = 0;
			offset = 0;
			limit = 10;
		}

		if (!searchTermSpellCheck) searchTerm = searchQuery.trim();

		showSearchProposals = false;

		if (!searchTerm) {
			showStatusInfo = false;
			showSearchProposals = false;
			isLoading = false;
			return;
		}

		if (searchTerm && searchTerm.length < 3) {
			showStatusInfo = false;
			isLoading = false;
			return;
		}

		const endpoint =
			window.location.hostname === 'localhost'
				? // @ts-ignore
				  `${API}/${lang}/searchbar.json?q=${searchTerm}&category=all&search_type[]=${
						searchType || 'continuing_education'
				  }&limit=${limit}&offset=${offset}`
				: `https://${
						window.location.hostname
				  }/${lang}/searchbar.json?q=${searchTerm}&category=all&search_type[]=${
						searchType || 'continuing_education'
				  }&limit=${limit}&offset=${offset}`;

		fetch(endpoint)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then((data) => {
				console.log('data', data);
				itemsCount = data.items.length;
				totalItems = data.items_total;

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
					observer.observe(target);
				}
			})
			.catch((e) => console.log('Oh no. An error occured!', e))
			.finally(() => {
				isLoading = false;
			});
	};

	$: {
		console.log('selected_taxonomy_subjectarea', selected_taxonomy_subjectarea);
		console.log(
			'selected_taxonomy_eduproducttype',
			selected_taxonomy_eduproducttype
		);
		console.log('selected_city', selected_city);
	}
</script>

<div>
	<SearchInput
		bind:query={searchQuery}
		bind:searchResults
		bind:showStatusInfo
		bind:showSearchProposals
		bind:searchTermSpellCheck
		bind:searchType
		{handleInput}
	/>
</div>
<div class="svelte__search_wrapper">
	<MultiSelectRow
		triggerCategorySearch={() => triggerSearchDebounced(true)}
		bind:searchType
		{template}
		{unobserve}
	/>
</div>

<div class="search__third-row">
	<div class="search__extra-holder">
		<button
			class="search__reset not-default"
			on:click={() => {
				console.log('RESET CLICKED');
			}}>{$_('filter_reset')}</button
		>
		<div class="listing__type">
			<span
				class="icon__grid"
				on:click={() => {
					console.log('GRID CLICKED');
				}}
			/>
			<span
				class="icon__list"
				on:click={() => {
					console.log('LIST CLICKED');
				}}
			/>
		</div>
	</div>
</div>

<div class="search__results">
	<div class="">
		<div class="search__cat">
			{#if showSearchProposals}
				<SearchProposals
					bind:query={searchQuery}
					bind:searchType
					{handleInput}
				/>
			{/if}
			{#if searchTermSpellCheck && !noAlternativeSearchTermFound && !showStatusInfo}
				<div class="widg__searchbar_spellcheck">
					<p>{$_('search_spellcheck_warning')} <b>{searchTerm}</b></p>
					<span
						>{$_('search_spellcheck_warning_2')}
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
				{lang}
				{listingType}
			/>
			{#if showStatusInfo && !searchTermSpellCheck}
				<div class="widg__searchbar_spellcheck">
					<p>{$_('search_no_results')}</p>
					<span>{$_('search_no_results_subtitle')}</span>
				</div>
			{/if}
		</div>
	</div>
</div>
