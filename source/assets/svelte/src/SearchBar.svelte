<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Search from './Search.svelte';
	import SearchBarIntro from './SearchBarIntro.svelte';
	import SearchResults from './SearchResults.svelte';
	import SearchCategories from './SearchCategories.svelte';
	import LoadingIndicator from './LoadingIndicator.svelte';
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
	let totalPages: number = null;
	let offset: number = 0;
	let limit: number = 10;
	let searchResults: string[] = [];
	let showIntroText: boolean = true;
	let showSearchCategories = false;
	let isLoading: boolean = false;
	let selectedCategory: string = 'all';
	let observer: any;
	let target: any;
	let showStatusInfo: boolean = true;

	let triggerSearchDebounced = debounce(async function () {
		await triggerSearch();
	}, 300);

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
			console.log('searchResults.length', searchResults.length);
			if (entry.isIntersecting) {
				triggerSearchDebounced();
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

	const handleSubmit = () => {
		showSearchCategories = false;
		searchTerm = searchQuery.trim();
		searchResults = [];

		totalPages = null;
		offset = 0;
		limit = 10;

		if (!searchTerm) return;

		observer.observe(target);
		showIntroText = false;
		triggerSearchDebounced();
	};

	const triggerSearch = async () => {
		isLoading = true;

		// if (!searchTerm) {
		//   console.log('trigger click', searchTerm, typeof searchTerm);
		//   searchResults = [];
		// }

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
				searchResults = [...searchResults, ...data.items];

				totalPages = data.items_total;

				if (offset + limit < totalPages) {
					offset += limit;
					limit = 20;
				}

				if (searchResults.length > 0) {
					showSearchCategories = true;
					showStatusInfo = true;
				} else {
					showSearchCategories = false;
					showStatusInfo = false;
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
		{handleSubmit}
		bind:showSearchCategories
		bind:showIntroText
		bind:searchResults
		bind:showStatusInfo
		{unobserve}
	/>
	{#if showIntroText}
		<SearchBarIntro />
	{/if}
	<div class="search__results">
		<div
			class="widg_searchbar-bar__content custom-scrollbar"
			data-searchbar="content"
		>
			<div class="search__cat">
				{#if showSearchCategories && showStatusInfo}
					<SearchCategories
						bind:selectedCategory
						triggerCategorySearch={() => triggerSearchDebounced()}
					/>
					<div class="widg_searchbar-bar__title">
						{$_('searchresult_title')}
					</div>
				{/if}
				{#if !showStatusInfo}
					<div
						class="no__results"
						in:fly={{ y: -200, duration: 2000 }}
						out:fly={{ y: -200, duration: 500 }}
					>
						{$_('search_no_results')}
					</div>
				{/if}
				<SearchResults results={searchResults} />
				<div class="loading-indicator">
					{#if isLoading}
						<LoadingIndicator />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
