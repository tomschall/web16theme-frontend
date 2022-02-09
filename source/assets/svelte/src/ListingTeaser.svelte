<script lang="ts">
	import type { Item } from './definitions/Item';
	import { _ } from 'svelte-i18n';

	export let item: Item;

	let mq = window.estatico.mq.query({ from: 'large' }); // Estatico media query

	const shortenDescription = (str: string): string => {
		return str.length >= 220 ? `${str.substring(0, 220)}...` : str;
	};

	$: mq;
</script>

<div class="widg_teaser {mq === false ? 'wide___third' : 'wide___quarter'}">
	{#if item['img'].src}
		<div class="widg_teaser__img">
			<img src={item['img'].src} alt={item['img'].alt} />
		</div>
	{/if}
	{#if item['taxonomy_eduproducttype'][0]}
		<span class="widg_teaser__dateline"
			>{item['taxonomy_eduproducttype'][1]}</span
		>
	{/if}

	{#if item.title}
		<h3 class="widg_teaser__title childless">{item.title}</h3>
	{/if}

	{#if item.description}
		<p>{shortenDescription(item.description)}</p>
	{/if}

	<a class="widg_teaser__link anchor-link" href={item['@id']}
		>zu Campus Brugg-Windisch</a
	>
	{#if item['start_string']}
		<small>{item['start_string']}</small>
	{/if}
	<span class="widg_teaser__arrow" />
</div>
