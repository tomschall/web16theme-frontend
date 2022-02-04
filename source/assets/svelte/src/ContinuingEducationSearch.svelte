<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import SearchInput from './SearchInput.svelte';
	import SearchResults from './SearchResults.svelte';
	import { init, addMessages } from 'svelte-i18n';
	import en from './lang/en.json';
	import de from './lang/de.json';
	import { debounce } from 'lodash';
	import type { Item } from './definitions/Item';
	import MultiSelectRow from './MultiSelectRow.svelte';
	import type { Option } from './multiselect';

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
	let selected_taxonomy_subjectarea: Option[] = [] as Option[];
	let selected_taxonomy_eduproducttype: Option[] = [] as Option[];
	let selected_city: Option[] = [] as Option[];
	let selectFormData: any;
	let selectFormDataElement: any = null;
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

	/**
   * If the user scrolls to the bottom of the page, and the search term is not empty, and the search
  term is longer than 4 characters, and the number of items is less than the limit, and the offset
  is less than the total number of items, then increase the offset by the limit and set the limit to
  20.
   * @param {any} entries - The IntersectionObserverEntry[] array of all the elements that are
  currently being observed.
   */
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

	/**
	 * The function takes a string as an argument and sets the global variable lang to the string.
	 * @param {string} langStr - The language string to set the language to.
	 */
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
		selectFormDataElement = document.querySelectorAll(
			'.widg_continuing_education_search'
		);
		selectFormData = JSON.parse(selectFormDataElement[0].dataset.widgetData);

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

	$: {
		if (
			selected_taxonomy_subjectarea ||
			selected_taxonomy_eduproducttype ||
			selected_city
		) {
			handleInput();
		}
	}

	/**
   * It fetches the search results from the API and updates the searchResults and
  searchResultsHighlighting variables.
   * @param {boolean} isFirst - boolean
   * @returns The search results.
   */
	const triggerSearch = async (isFirst: boolean) => {
		if (isFirst) {
			searchResults = [];
			totalItems = 0;
			offset = 0;
			limit = 10;
		}

		if (!searchTermSpellCheck) searchTerm = searchQuery.trim();

		showSearchProposals = false;

		if (
			!searchTerm &&
			selected_taxonomy_subjectarea.length === 0 &&
			selected_taxonomy_eduproducttype.length === 0 &&
			selected_city.length === 0
		) {
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

		// MULTIPLE SELECT QUERYS
		const subjectArea = selected_taxonomy_subjectarea.map((area) => {
			return `&taxonomy_subjectarea[]=${area.value}`;
		});

		const subjectEduProductType = selected_taxonomy_eduproducttype.map(
			(type) => {
				return `&taxonomy_eduproducttype[]=${type.value}`;
			}
		);

		const selectedCity = selected_city.map((location) => {
			return `&city[]=${location.value}`;
		});

		const queryPrefix =
			'/searchbar.json?template=training_full&category=continuing_education&q=';

		const endpoint =
			window.location.hostname === 'localhost'
				? // @ts-ignore
				  `${API}/${lang}${queryPrefix}${searchQuery}${subjectArea.join(
						''
				  )}${subjectEduProductType.join('')}${selectedCity.join(
						''
				  )}&limit=${limit}&offset=${offset}`
				: `https://${
						window.location.hostname
				  }/${lang}${queryPrefix}${searchQuery}${subjectArea.join(
						''
				  )}${subjectEduProductType.join('')}${selectedCity.join(
						''
				  )}&limit=${limit}&offset=${offset}`;

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

	const handleReset = () => {
		if (selectFormData.filterSubjectArea) selected_taxonomy_subjectarea = [];
		if (selectFormData.filterEduProductType)
			selected_taxonomy_eduproducttype = [];
		if (selectFormData.filterLocation) selected_city = [];
		searchQuery = '';
		searchResults = [];
	};
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
	{#if selectFormData}
		<MultiSelectRow
			bind:selected_taxonomy_subjectarea
			bind:selected_taxonomy_eduproducttype
			bind:selected_city
			bind:selectFormData
		/>
	{/if}
</div>

<div class="search__third-row">
	<div class="search__extra-holder">
		<button class="search__reset not-default btn__rotate" on:click={handleReset}
			>{$_('filter_reset')}</button
		>
		<div class="listing__type">
			<span
				class="icon__grid {listingType === 'grid' ? 'active' : ''}"
				on:click={() => {
					listingType = 'grid';
				}}
			/>
			<span
				class="icon__list {listingType === 'list' ? 'active' : ''}"
				on:click={() => {
					listingType = 'list';
				}}
			/>
		</div>
	</div>
</div>

<div class="search__results">
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
