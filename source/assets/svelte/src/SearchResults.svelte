<script>
	import { _ } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import ListItem from './ListingNormal.svelte';
	export let results;
	export let activeSearch;
</script>

<div class="search__results">
	{#if activeSearch === true}
		<div class="no__results" transition:fly="{{ y: -200, duration: 2000 }}">
			{$_('search_no_results')}
		</div>
	{/if}
	<ul class="search-results">
		{#each results as result (result)}
			<ListItem item={result} />
		{/each}
	</ul>
</div>