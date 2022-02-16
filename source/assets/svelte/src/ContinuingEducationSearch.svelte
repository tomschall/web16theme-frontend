<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import SearchInput from './SearchInput.svelte';
	import SearchResults from './SearchResults.svelte';
	import { debounce } from 'lodash';
	import type { Item } from './definitions/Item';
	import MultiSelectRow from './MultiSelectRow.svelte';
	import type { Option } from './multiselect';

	export let template: string = '';
	export let listingType = 'grid';

	let searchQuery: string = '';
	let searchTerm: string = null;
	let totalItems: number = null;
	let offset: number = 0;
	let limit: number = 9;
	let searchResults: Item[] = [];
	let isLoading: boolean = false;
	let observer: any;
	let target: any;
	let showStatusInfo: boolean = false;
	let isFirstSearch: boolean = true;
	let itemsCount: number = null;
	let urlParams = new URLSearchParams(window.location.search);
	let lang: string = null;
	let selected_taxonomy_subjectarea: Option[] = [] as Option[];
	let selected_taxonomy_dateline: Option[] = [] as Option[];
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
				if (isFirstSearch) return;

				if (itemsCount < limit) {
					unobserve();
					return;
				}

				isLoading = true;

				if (offset + limit < totalItems) {
					offset += limit;
					limit = 9;
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

		console.log('selectFormData', selectFormData);

		setLanguage(window.location.href.split('/')[3]);

		document.title = $_('searchpage_title');
		observer = new IntersectionObserver(loadMoreResults, options);
		target = document.querySelector('.loading-indicator');
		if (urlParams.has('query')) {
			searchQuery = urlParams.get('query');
			if (searchQuery) handleInput();
		} else {
			handleInput();
		}
	});

	const handleInput: () => void = function () {
		if (observer) unobserve();
		isLoading = true;

		triggerSearchDebounced(true);
	};

	$: {
		if (
			selected_taxonomy_subjectarea ||
			selected_taxonomy_dateline ||
			selected_city
		) {
			handleInput();
		}
	}

	const assembleQuery = () => {
		// MULTIPLE SELECT QUERYS
		const subjectArea = selected_taxonomy_subjectarea.map((area) => {
			return `&taxonomy_subjectarea[]=${area.value}`;
		});

		const dateLine = selected_taxonomy_dateline.map((type) => {
			return `&taxonomy_datelines[]=${type.value}`;
		});

		const city = selected_city.map((location) => {
			return `&city[]=${location.value}`;
		});

		const queryPrefix =
			'/searchbar.json?template=training_full&category=continuing_education&q=';

		const query =
			window.location.hostname === 'localhost'
				? // @ts-ignore
				  `${API}/${lang}${queryPrefix}${searchQuery}${subjectArea.join(
						''
				  )}${dateLine.join('')}${city.join(
						''
				  )}&limit=${limit}&offset=${offset}`
				: `https://${
						window.location.hostname
				  }/${lang}${queryPrefix}${searchQuery}${subjectArea.join(
						''
				  )}${dateLine.join('')}${city.join(
						''
				  )}&limit=${limit}&offset=${offset}`;

		return query;
	};

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
			limit = 9;
		}

		searchTerm = searchQuery.trim();

		const endpoint = assembleQuery();

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

				console.log(itemsCount, totalItems);

				if (isFirst) {
					searchResults = [...data.items];
					isFirstSearch = false;
					observer.observe(target);
				}

				if (searchResults.length > 0) {
					showStatusInfo = false;
				} else {
					showStatusInfo = true;
				}
			})
			.catch((e) => console.log('Oh no. An error occured!', e))
			.finally(() => {
				isLoading = false;
			});
	};

	const handleReset = () => {
		if (selectFormData.filterSubjectArea) selected_taxonomy_subjectarea = [];
		if (selectFormData.filterDateLine) selected_taxonomy_dateline = [];
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
		{handleInput}
	/>
</div>
<div class="svelte__search_wrapper">
	{#if selectFormData}
		<MultiSelectRow
			bind:selected_taxonomy_subjectarea
			bind:selected_taxonomy_dateline
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
		{isLoading}
		{template}
		{searchTerm}
		{lang}
		{listingType}
		bind:selectFormData
	/>
	{#if showStatusInfo}
		<div class="widg__searchbar_spellcheck">
			<p>{$_('search_no_results')}</p>
			<span>{$_('search_no_results_subtitle')}</span>
		</div>
	{/if}
</div>
