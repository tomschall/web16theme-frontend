<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Item } from './definitions/Item';
	import ListItem from './ListingNormal.svelte';
	import LoadingIndicator from './LoadingIndicator.svelte';

	export let results: Item[];
	export let isLoading: boolean;
	export let searchResultsHighlighting: any[];
	export let template: string;
	export let searchTerm: string;
	export let searchType: string;
</script>

<div class="search__results">
	<ul class="search-results">
		{#each results as result, index (index)}
			{#if index < 9 && template === 'searchbar'}
				<ListItem item={result} {searchResultsHighlighting} />
			{/if}
			{#if template === 'searchpage'}
				<ListItem item={result} {searchResultsHighlighting} />
			{/if}
		{/each}
		{#if results.length > 0 && template === 'searchbar'}
			<a
				class="widg_searchbar__go-to-page not-default"
				href={`${window.location.pathname}?query=${searchTerm}&searchtype=${searchType}`}
				>{$_('search_all_results')}</a
			>
		{/if}
	</ul>
</div>
<div class="loading-indicator">
	{#if isLoading}
		<LoadingIndicator />
	{/if}
</div>

<style>
	.loading-indicator {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 20px;
		padding-bottom: 10px;
	}
</style>
