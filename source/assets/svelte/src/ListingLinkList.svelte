<script lang="ts">
	import type { Item } from './definitions/Item';
	import { _ } from 'svelte-i18n';

	export let item: Item;
</script>

<li class="widg_linklist___entry">
	<a class="anchor-link" href={item['@id']}>
		<div class="widg_linklist__img-wrapper">
			<img src={item['img'].src} alt={item['img'].alt} />
		</div>
		{#if item['taxonomy_eduproducttype'][0]}
			<span class="widg_linklist__dateline"
				>{item['taxonomy_eduproducttype'][1]}</span
			>
		{/if}

		{#if item.title}
			<h3 class="childless">{item.title}</h3>
		{/if}

		{#if item['start_string']}
			<small>{item['start_string']}</small>
		{/if}

		{#if item.description}
			<p>
				{item.description}
			</p>
		{/if}
	</a>
</li>
