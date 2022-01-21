<script lang="ts">
	import type { Item } from './definitions/Item';
	import { _ } from 'svelte-i18n';
	import SvelteMarkdown from 'svelte-markdown';
	import Paragraph from './Paragraph.svelte';

	// export let item: Item;
	// export let searchResultsHighlighting: any[];

	// let mq = window.estatico.mq.query({ from: 'small' }); // Estatico media query
</script>

<div class="widg_teaser wide___third">
	<div class="widg_teaser__img">
		<img src="https://dummyimage.com/300x180/ccc/000.png" alt="Dummy Image" />
	</div>
	<span class="widg_teaser__dateline">MAS</span>
	<h3 class="widg_teaser__title childless">Campus Brugg-Windisch</h3>
	<a class="widg_teaser__link anchor-link" href="http://localhost:9000"
		>zu Campus Brugg-Windisch</a
	>
	<span class="widg_teaser__arrow" />
</div>
