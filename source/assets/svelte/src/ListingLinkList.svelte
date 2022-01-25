<script lang="ts">
	import type { Item } from './definitions/Item';
	import { _ } from 'svelte-i18n';

	export let item: Item;
</script>

<li class="widg_linklist___entry">
	<a class="anchor-link" href="http://localhost:9000">
		<div class="widg_linklist__img-wrapper">
			<img src={item['img'].src} alt={item['img'].alt} />
		</div>
		<span class="widg_linklist__dateline">CAS</span>

		{#if item.title}
			<h3 class="childless">{item.title}</h3>
		{/if}

		<span>TO BE DISCUSSED</span>

		{#if item.description}
			<p>
				{item.description}
			</p>
		{/if}
	</a>
</li>
