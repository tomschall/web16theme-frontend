<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Search from './Search.svelte';
	import SearchBarIntro from './SearchBarIntro.svelte';
	import SearchResults from './SearchResults.svelte';
	import SearchCategories from './SearchCategories.svelte';
	import SearchProposals from './SearchProposals.svelte';
	import { init, getLocaleFromNavigator, addMessages } from 'svelte-i18n';
	import en from './lang/en.json';
	import de from './lang/de.json';
	import { debounce } from 'lodash';

	addMessages('en', en);
	addMessages('de', de);

	init({
		fallbackLocale: 'de',
		initialLocale: getLocaleFromNavigator(),
	});

	let searchQuery: string = '';
	let searchTerm: string = null;
	let searchTermSpellCheck: string = null;
	let triedAlternativeSearchTerm: boolean = false;
	let totalItems: number = null;
	let offset: number = 0;
	let limit: number = 10;
	let searchResults: string[] = [];
	let showSearchBarIntro: boolean = true;
	let showSearchCategories = false;
	let showSearchProposals = true;
	let isLoading: boolean = false;
	let selectedCategory: string = 'all';
	let observer: any;
	let target: any;
	let showStatusInfo: boolean = false;
	let isFirstSearch: boolean = true;
	let itemsCount: number = null;

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
		observer = new IntersectionObserver(loadMoreResults, options);
		target = document.querySelector('.loading-indicator');
	});

	const handleInput = () => {
		triedAlternativeSearchTerm = false;
		unobserve();
		isLoading = true;
		searchTermSpellCheck = null;

		triggerSearchDebounced(true);
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

		if (!searchTerm) {
			showSearchBarIntro = true;
			showStatusInfo = false;
			showSearchProposals = false;
			isLoading = false;
			return;
		}

		if (searchTerm && searchTerm.length < 4) {
			showSearchBarIntro = false;
			showStatusInfo = false;
			showSearchProposals = true;
			showSearchCategories = false;
			isLoading = false;
			return;
		}

		showSearchProposals = true;

		const endpoint = `https://www.dev.fhnw.ch/de/searchbar.json?q=${searchTerm}&category=${
			selectedCategory || 'all'
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

				if (totalItems === 0 && !triedAlternativeSearchTerm) {
					searchTermSpellCheck = searchTerm;

					const spellCheckEndpoint = `https://www.dev.fhnw.ch/de/spellcheck?term=${searchTermSpellCheck}`;

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
								triedAlternativeSearchTerm = true;
							} else {
								searchTerm = data.suggestions[0].value;
							}
						})
						.catch(() => {
							console.log('An spellcheck error occured!');
							triedAlternativeSearchTerm = true;
						})
						.finally(() => {
							triggerSearch(true);
						});
				}

				searchResults = [...searchResults, ...data.items];

				if (isFirst) {
					searchResults = [...data.items];
					observer.observe(target);
					isFirstSearch = false;
				}

				if (searchResults.length > 0) {
					showSearchCategories = true;
					showStatusInfo = false;
				} else {
					showSearchCategories = false;
					showStatusInfo = true;
				}
			})
			.catch(() => console.log('Oh no. An error occured!'))
			.finally(() => {
				isLoading = false;
			});
	};
</script>

<div class="widg_search_svelte">
	<Search
		bind:query={searchQuery}
		bind:showSearchCategories
		bind:showSearchBarIntro
		bind:searchResults
		bind:showStatusInfo
		bind:showSearchProposals
		bind:searchTermSpellCheck
		{handleInput}
		{unobserve}
	/>
	{#if showSearchBarIntro}
		<SearchBarIntro />
	{/if}
	<div class="search__results">
		<div
			class="widg_searchbar-bar__content custom-scrollbar"
			data-searchbar="content"
		>
			<div class="search__cat">
				{#if showSearchCategories}
					<SearchCategories
						bind:selectedCategory
						bind:totalItems
						triggerCategorySearch={() => triggerSearchDebounced(true)}
					/>
				{/if}
				{#if showSearchProposals}
					<SearchProposals bind:query={searchQuery} {handleInput} />
				{/if}
				{#if searchTermSpellCheck && !triedAlternativeSearchTerm && !showStatusInfo}
					<div class="widg_searchbar-bar__title">
						<p>{$_('searchresult_title')}</p>
					</div>
					<div class="widg__searchbar_autocomplete">
						<p>{$_('search_autocomplete_warning')} <b>{searchTerm}</b></p>
						<span
							>{$_('search_autocomlete_warning_2')}
							<b>"{searchTermSpellCheck}"</b></span
						>
					</div>
				{/if}
				<SearchResults results={searchResults} {isLoading} />
				{#if showStatusInfo && !searchTermSpellCheck}
					<div
						class="no__results"
						in:fly={{ y: -200, duration: 2000 }}
						out:fly={{ y: -200, duration: 500 }}
					>
						{$_('search_no_results')}
						<span>{$_('search_no_results_subtitle')}</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
