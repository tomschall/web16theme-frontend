<script lang="ts">
	import type { Item } from './definitions/Item';
	import { _ } from 'svelte-i18n';
	import SvelteMarkdown from 'svelte-markdown';
	import Paragraph from './Paragraph.svelte';

	export let item: Item;

	console.log(item, item['img'].src);

	// export let item: Item;
	// export let searchResultsHighlighting: any[];

	// let mq = window.estatico.mq.query({ from: 'small' }); // Estatico media query
</script>

<div class="widg_teaser">
	{#if item['img'].src}
		<div class="widg_teaser__img">
			<img src={item['img'].src} alt={item['img'].alt} />
		</div>
	{/if}
	<span class="widg_teaser__dateline">MAS</span>
	<h3 class="widg_teaser__title childless">{item.title}</h3>
	<p>{item.description}</p>
	<small>{item['fhnw_location']}</small>
	<a class="widg_teaser__link anchor-link" href={item['@id']}
		>zu Campus Brugg-Windisch</a
	>
	<span class="widg_teaser__arrow" />
</div>
