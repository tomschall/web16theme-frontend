<script>
	import { _ } from 'svelte-i18n';
	import { fly, fade } from 'svelte/transition';
	import ListItem from './ListingNormal.svelte';

	export let results;
</script>

<div class="search__results">
	<ul class="search-results">
		{#each results as result (result)}
			<ListItem item={result} />
		{/each}
	</ul>
</div>
