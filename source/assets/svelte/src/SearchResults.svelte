<script>
	import { _ } from 'svelte-i18n';
	import ListItem from './ListingNormal.svelte';
	import LoadingIndicator from './LoadingIndicator.svelte';

	export let results;
	export let isLoading;
</script>

<div class="search__results">
	<ul class="search-results">
		{#each results as result (result)}
			<ListItem item={result} />
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
		padding-bottom: 10px;
	}
</style>
