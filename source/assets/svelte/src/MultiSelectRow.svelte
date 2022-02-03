<script lang="ts">
	import { onMount } from 'svelte';
	import type { ProtoOption, Option } from './multiselect';
	import MultiSelect from './multiselect';
	export let selectFormData: any;
	export let selected_taxonomy_subjectarea: Option[] = [] as Option[];
	export let selected_taxonomy_eduproducttype: Option[] = [] as Option[];
	export let selected_city: Option[] = [] as Option[];

	let taxonomy_subjectarea: Option[] = [] as Option[];
	let taxonomy_eduproducttype: Option[] = [] as Option[];
	let city: Option[] = [] as Option[];

	let multiSelectTypeLabel = {
		subjectarea: 'multiple_label_subjectarea',
		type: 'multiple_label_type',
		location: 'multiple_label_location',
	};

	onMount(() => {
		city = selectFormData?.locationOptions.map(
			(option: {
				optionValue: string;
				optionLabel: string;
				selected: boolean;
			}) => {
				return {
					value: option.optionValue,
					label: option.optionLabel,
					preselected: option.selected,
				};
			}
		);

		selected_city = city?.filter((option) => option.preselected === true);

		taxonomy_subjectarea = selectFormData?.subjectAreaOptions.map(
			(option: {
				optionValue: string;
				optionLabel: string;
				selected: boolean;
			}) => {
				return {
					value: option.optionValue,
					label: option.optionLabel,
					preselected: option.selected,
				};
			}
		);

		selected_taxonomy_subjectarea = taxonomy_subjectarea?.filter(
			(option) => option.preselected === true
		);

		taxonomy_eduproducttype = selectFormData?.eduProductTypeOptions.map(
			(option: {
				optionValue: string;
				optionLabel: string;
				selected: boolean;
			}) => {
				return {
					value: option.optionValue,
					label: option.optionLabel,
					preselected: option.selected,
				};
			}
		);

		selected_taxonomy_eduproducttype = taxonomy_eduproducttype?.filter(
			(option) => option.preselected === true
		);
	});

	$: {
		console.log('selectFormData', selectFormData);
		console.log('city', city);
		console.log('selected_city', selected_city);
	}
</script>

{#if taxonomy_subjectarea}
	<MultiSelect
		bind:selected={selected_taxonomy_subjectarea}
		options={taxonomy_subjectarea}
		dropDownLabel={multiSelectTypeLabel.subjectarea}
		id="subjectArea"
	/>
{/if}

{#if taxonomy_eduproducttype}
	<MultiSelect
		bind:selected={selected_taxonomy_eduproducttype}
		options={taxonomy_eduproducttype}
		dropDownLabel={multiSelectTypeLabel.type}
		id="subjectType"
	/>
{/if}

{#if city}
	<MultiSelect
		bind:selected={selected_city}
		options={city}
		dropDownLabel={multiSelectTypeLabel.location}
		id="subjectLocation"
	/>
{/if}
