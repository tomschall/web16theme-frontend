<script lang="ts">
	import type { Item } from './definitions/Item';
	import { _ } from 'svelte-i18n';

	export let item: Item;
	export let selectFormData: any = [];

	interface DateLineOption {
		optionValue: string;
		optionLabel: string;
		selected: boolean;
	}

	let mq = window.estatico.mq.query({ from: 'larger' }); // Breakpoint >1920px

	const shortenDescription = (str: string): string => {
		return str.length >= 220 ? `${str.substring(0, 220)}...` : str;
	};

	let dateLine: string = '';
	let city: string = '';

	$: {
		if (selectFormData?.dateLineOptions?.length) {
			dateLine = selectFormData?.dateLineOptions
				.filter(
					(val: DateLineOption) =>
						item['taxonomy_datelines'] &&
						val.optionValue === item['taxonomy_datelines'][0]
				)
				.reduce(
					(acc: DateLineOption, curr: DateLineOption): string =>
						curr.optionLabel,
					''
				);
		}
	}

	$: {
		if (selectFormData?.locationOptions?.length) {
			city = selectFormData?.locationOptions
				.filter(
					(val: DateLineOption) =>
						item['city'] && val.optionValue === item['city'][0]
				)
				.reduce(
					(acc: DateLineOption, curr: DateLineOption): string =>
						curr.optionLabel,
					''
				);
		}
	}
</script>

<div class="widg_teaser {mq === false ? 'wide___third' : 'wide___quarter'}">
	{#if item['img'].src}
		<div class="widg_teaser__img">
			<img src={item['img'].src} alt={item['img'].alt} />
		</div>
	{/if}
	{#if dateLine}
		<span class="widg_teaser__dateline">{dateLine}</span>
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
