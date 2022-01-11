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

	let taxonomy_subjectarea = [
		{ value: 1002, name: 'Informatik' },
		{ value: 1003, name: 'International Studies' },
		{ value: 1004, name: 'Life Sciences' },
	];

	let selected_taxonomy_subjectarea = [
		taxonomy_subjectarea[0],
		taxonomy_subjectarea[1],
	];

	let taxonomy_eduproducttype = [
		{ value: 2000, name: 'CAS' },
		{ value: 2001, name: 'DAS' },
		{ value: 2008, name: 'MAS' },
	];

	let selected_taxonomy_eduproducttype = [
		taxonomy_eduproducttype[0],
		taxonomy_eduproducttype[1],
	];

	let city = [
		{ value: 'muttenz', name: 'Muttenz' },
		{ value: 'basel', name: 'Basel' },
		{ value: 'brugg-windisch', name: 'Brugg-Windisch' },
	];

	let selected_city = [city[0], city[2]];

	addMessages('en', en);
	addMessages('de', de);

	init({
		fallbackLocale: 'de',
		initialLocale: document.documentElement.lang,
	});

	export let template: string = '';
	export let listingType = 'list';

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
	let searchType: string = 'all';
	let observer: any;
	let target: any;
	let showStatusInfo: boolean = false;
	let isFirstSearch: boolean = true;
	let itemsCount: number = null;
	let urlParams = new URLSearchParams(window.location.search);
	let lang: string = null;
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
				searchType = urlParams.get('searchtype') || 'all';
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
						searchType || 'all'
				  }&limit=${limit}&offset=${offset}`
				: `https://${
						window.location.hostname
				  }/${lang}/searchbar.json?q=${searchTerm}&category=all&search_type[]=${
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

<div class="search__wrapper">
	<div class="search__form-wrapper">
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
		<div>
			<div class="search__holder select2__wrapper">
				<select
					multiple
					bind:value={selected_taxonomy_subjectarea}
					on:change={() =>
						console.log('event fired selected_taxonomy_subjectarea')}
				>
					{#each taxonomy_subjectarea as area}
						<option value={area}>
							{area.name}
						</option>
					{/each}
				</select>
			</div>

			<div class="search__holder select2__wrapper">
				<select
					multiple
					bind:value={selected_taxonomy_eduproducttype}
					on:change={() =>
						console.log('event fired selected_taxonomy_eduproducttype')}
				>
					{#each taxonomy_eduproducttype as type}
						<option value={type}>
							{type.name}
						</option>
					{/each}
				</select>
			</div>

			<div class="search__holder select2__wrapper">
				<select
					multiple
					bind:value={selected_city}
					on:change={() => console.log('event fired selected_city')}
				>
					{#each city as c}
						<option value={c}>
							{c.name}
						</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="search__results">
			<div class="widg_searchbar-bar__content">
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
					{#if searchResults.length}
						<div class="widg_searchbar-bar__title">
							<p>{$_('searchresult_title')}</p>
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
	</div>
</div>

<style>
	::-webkit-scrollbar {
		width: 9px;
	}

	::-webkit-scrollbar-thumb {
		border: 2px solid rgba(0, 0, 0, 0);
		background-clip: padding-box;
		background-color: #bebdb9;
		border-radius: 9999px;
	}

	select {
		width: 100%;
		opacity: unset;
	}
</style>
