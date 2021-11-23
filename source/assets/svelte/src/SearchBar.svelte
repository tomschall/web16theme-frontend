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
	let totalItems: number = null;
	let offset: number = 0;
	let limit: number = 10;
	let searchResults: string[] = [];
	let showSearchBarIntro: boolean = true;
	let showSearchCategories = false;
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
		unobserve();

		showSearchBarIntro = false;
		isLoading = true;

		triggerSearchDebounced(true);
	};

	const triggerSearch = async (isFirst: boolean) => {
		totalItems = 0;
		offset = 0;
		limit = 10;

		showSearchCategories = false;
		searchResults = [];

		searchTerm = searchQuery.trim();

		if (!searchTerm || searchTerm.length < 4) {
			showSearchBarIntro = true;
			showStatusInfo = false;
			isLoading = false;
			return;
		}

		const endpoint = `https://www.fhnw.ch/de/searchbar.json?q=${searchTerm}&category=${
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
			.catch(() => console.log('An error occured!'))
			.finally(() => {
				isLoading = false;
			});
	};
</script>

<div class="widg_search_svelte">
	<Search
		bind:query={searchQuery}
		{handleInput}
		bind:showSearchCategories
		bind:showSearchBarIntro
		bind:searchResults
		bind:showStatusInfo
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
					<SearchProposals />
					<div class="widg_searchbar-bar__title">
						<p><span>{totalItems}</span> {$_('searchresult_title')}</p>
					</div>
				{/if}
				{#if showStatusInfo}
					<div
						class="no__results"
						in:fly={{ y: -200, duration: 2000 }}
						out:fly={{ y: -200, duration: 500 }}
					>
						{$_('search_no_results')}
						<span>Bitte erstellen sie eine neue Suchanfrage</span>
					</div>
				{/if}
				<SearchResults results={searchResults} {isLoading} />
			</div>
		</div>
	</div>
</div>
