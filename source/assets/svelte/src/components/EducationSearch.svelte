<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import SearchInput from './input/SearchInput.svelte';
	import SearchResults from './list/SearchResults.svelte';
	import { debounce } from 'lodash';
	import type { Item } from '../common/Item';
	import MultiSelectRow from './multiselect/MultiSelectRow.svelte';
	import type { Option } from './multiselect';
	import { switchMetaTag, setAppHeight, setHostname } from '../lib/utils';
	import { setLanguage } from '../lib/language';

	export let template: string = '';
	export let listingType = 'grid';

	let searchQuery: string = '';
	let searchTerm: string = null;
	let totalItems: number = null;
	let offset: number = 0;
	let limit: number = 12;
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
	let category: string;
	let hostname: string;
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

				if (offset + limit < totalItems) {
					isLoading = true;
					offset += limit;
					triggerSearchDebounced(false);
				} else {
					unobserve();
				}
			}
		});
	};

	let unobserve = () => {
		observer.unobserve(target);
	};

	onMount(() => {
		const selector =
			template === 'education'
				? '.widg_education_search'
				: '.widg_continuing_education_search';

		category =
			template === 'education' ? 'degree_programmes' : 'continuing_education';

		selectFormDataElement = document.querySelectorAll(selector);
		selectFormData = JSON.parse(selectFormDataElement[0].dataset.widgetData);

		lang = setLanguage(window.location.href.split('/')[3]);
		hostname = setHostname();
		setAppHeight();
		switchMetaTag();

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

		const queryPrefix = `/searchbar.json?template=training_full&category=${category}&q=`;

		const query =
			window.location.hostname === 'localhost'
				? // @ts-ignore
				  `${API}/${lang}${queryPrefix}${searchQuery}${subjectArea.join(
						''
				  )}${dateLine.join('')}${city.join(
						''
				  )}&limit=${limit}&offset=${offset}`
				: `https://${hostname}/${lang}${queryPrefix}${searchQuery}${subjectArea.join(
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
			totalItems = 0;
			offset = 0;
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

				if (isFirst) searchResults = [];

				searchResults = [...searchResults, ...data.items];

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
