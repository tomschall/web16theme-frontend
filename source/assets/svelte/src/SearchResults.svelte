<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Item } from './definitions/Item';
	import ListItem from './ListingNormal.svelte';
	import LoadingIndicator from './LoadingIndicator.svelte';

	export let results: Item[];
	export let isLoading: boolean;
	export let searchResultsHighlighting: any[];
</script>

<div class="search__results">
	<ul class="search-results">
		{#each results as result (result)}
			<ListItem item={result} {searchResultsHighlighting} />
		{/each}
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
