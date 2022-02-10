<script lang="ts">
	import type { Item } from './definitions/Item';
	import { _ } from 'svelte-i18n';

	export let item: Item;
	export let selectFormData: any;

	interface DateLineOption {
		optionValue: string;
		optionLabel: string;
		selected: boolean;
	}

	let dateLine: string;
	let city: string;

	$: {
		dateLine = selectFormData?.dateLineOptions
			.filter(
				(val: DateLineOption) =>
					item['taxonomy_datelines'] &&
					val.optionValue === item['taxonomy_datelines'][0]
			)
			.reduce(
				(acc: DateLineOption, curr: DateLineOption): string => curr.optionLabel,
				''
			);
	}

	$: {
		city = selectFormData?.locationOptions
			.filter(
				(val: DateLineOption) =>
					item['city'] && val.optionValue === item['city'][0]
			)
			.reduce(
				(acc: DateLineOption, curr: DateLineOption): string => curr.optionLabel,
				''
			);
	}
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
				<small>{city} | {item.start_continuing_education}</small>
			{/if}
		</div>
	</a>
</li>
