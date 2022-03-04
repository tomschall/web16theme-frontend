<script lang="ts">
	import type { Item } from '../../common/Item';

	export let item: Item;
	export let city: string;
	export let dateLine: string;
</script>

<li class="widg_linklist___entry">
	<a class="anchor-link" href={item['@id']}>
		<div class="widg_linklist__img-wrapper">
			<img src={item['img'].src} alt={item['img'].alt} />
		</div>

		<div class="widg_linklist__content">
			{#if item.title}
				<h3 class="childless">{item.title}</h3>
			{/if}

			{#if dateLine}
				<span class="widg_linklist__dateline">{dateLine}</span>
			{/if}

			{#if item.description}
				<p>
					{item.description}
				</p>
			{/if}

			{#if city}
				<small
					>{city}
					{#if item.start_continuing_education}
						| {item.start_continuing_education}{/if}</small
				>
			{/if}
		</div>
	</a>
</li>
