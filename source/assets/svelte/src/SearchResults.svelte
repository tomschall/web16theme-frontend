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
	export let lang: string;

	function IsSafari() {
		var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
		return is_safari;
	}
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
			<li>
				<a
					class="widg_searchbar__go-to-page not-default"
					href={`/${lang}/search_all?query=${searchTerm}&searchtype=${searchType}`}
					>{$_('search_all_results')}</a
				>
			</li>
		{/if}
		{#if IsSafari()}
			<li class="ios-space" />
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

	.ios-space {
		height: 100px;
		margin-bottom: 50px;
	}
</style>
