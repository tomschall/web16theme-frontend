<script lang="ts">
	import { onMount } from 'svelte';
	import MultiSelect from '../../multiselect';
	import type { Option } from '../../multiselect';

	export let selectFormData: any;
	export let selected_taxonomy_subjectarea: Option[] = [] as Option[];
	export let selected_taxonomy_dateline: Option[] = [] as Option[];
	export let selected_city: Option[] = [] as Option[];

	let taxonomy_subjectarea: Option[] = [] as Option[];
	let taxonomy_dateline: Option[] = [] as Option[];
	let city: Option[] = [] as Option[];
	let setMultiSelectWidth: String = '';

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

		taxonomy_dateline = selectFormData?.dateLineOptions.map(
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

		selected_taxonomy_dateline = taxonomy_dateline?.filter(
			(option) => option.preselected === true
		);
	});

	if (
		selectFormData.filterDateLine === true &&
		selectFormData.filterSubjectArea === true &&
		selectFormData.filterLocation === true
	) {
		setMultiSelectWidth = '32%';
	} else {
		setMultiSelectWidth = '48%';
	}
</script>

{#if taxonomy_subjectarea && selectFormData.filterSubjectArea}
	<MultiSelect
		bind:selected={selected_taxonomy_subjectarea}
		options={taxonomy_subjectarea}
		dropDownLabel={multiSelectTypeLabel.subjectarea}
		id="subjectArea"
		{setMultiSelectWidth}
	/>
{/if}

{#if taxonomy_dateline && selectFormData.filterDateLine}
	<MultiSelect
		bind:selected={selected_taxonomy_dateline}
		options={taxonomy_dateline}
		dropDownLabel={multiSelectTypeLabel.type}
		id="subjectType"
		{setMultiSelectWidth}
	/>
{/if}

{#if city && selectFormData.filterLocation}
	<MultiSelect
		bind:selected={selected_city}
		options={city}
		dropDownLabel={multiSelectTypeLabel.location}
		id="subjectLocation"
		{setMultiSelectWidth}
	/>
{/if}
