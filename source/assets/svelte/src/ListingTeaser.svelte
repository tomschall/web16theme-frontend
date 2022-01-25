<script lang="ts">
	import type { Item } from './definitions/Item';
	import { _ } from 'svelte-i18n';

	export let item: Item;

	const shortenDescription = (str: string): string => {
		return str.length >= 220 ? `${str.substring(0, 220)}...` : str;
	};
</script>

<div class="widg_teaser wide___third">
	{#if item['img'].src}
		<div class="widg_teaser__img">
			<img src={item['img'].src} alt={item['img'].alt} />
		</div>
	{/if}
	<span class="widg_teaser__dateline">(NOT DEFINED)</span>

	{#if item.title}
		<h3 class="widg_teaser__title childless">{item.title}</h3>
	{/if}

	{#if item.description}
		<p>{shortenDescription(item.description)}</p>
	{/if}

	{#if item['fhnw_location']}
		<small>{item['fhnw_location']}</small>
	{/if}
	<a class="widg_teaser__link anchor-link" href={item['@id']}
		>zu Campus Brugg-Windisch</a
	>
	<span class="widg_teaser__arrow" />
</div>
