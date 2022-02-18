<script lang="ts">
	import type { Item } from '../../definitions/Item';
	import ListingLinkList from './list/ListingLinkList.svelte';
	import ListingTeaser from './list/ListingTeaser.svelte';

	export let item: Item;
	export let selectFormData: any = [];
	export let template: string;

	interface DateLineOption {
		optionValue: string;
		optionLabel: string;
		selected: boolean;
	}

	let dateLine: string = '';
	let city: string = '';

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

{#if template === 'teaser'}
	<ListingTeaser {item} {city} {dateLine} />
{/if}

{#if template === 'list'}
	<ListingLinkList {item} {city} {dateLine} />
{/if}
