<script lang="ts">
	import MultiSelect from './multiselect';
	export let selectFormData: any;
	export let selected_taxonomy_subjectarea = [];
	export let selected_taxonomy_eduproducttype = [];
	export let selected_city = [];
	let taxonomy_subjectarea = [];
	let taxonomy_eduproducttype = [];
	let city = [];

	let multiSelectTypeLabel = {
		subjectarea: 'multiple_label_subjectarea',
		type: 'multiple_label_type',
		location: 'multiple_label_location',
	};

	$: taxonomy_subjectarea = selectFormData?.subjectAreaOptions.map(
		(option: {
			optionValue: string;
			optionLabel: string;
			selected: boolean;
		}) => {
			return {
				value: option.optionValue,
				label: option.optionLabel,
				selected: option.selected,
			};
		}
	);

	$: selected_taxonomy_subjectarea = taxonomy_subjectarea?.filter(
		(option) => option.selected === true
	);

	$: taxonomy_eduproducttype = selectFormData?.eduProductTypeOptions.map(
		(option: {
			optionValue: string;
			optionLabel: string;
			selected: boolean;
		}) => {
			return {
				value: option.optionValue,
				label: option.optionLabel,
				selected: option.selected,
			};
		}
	);

	$: selected_taxonomy_eduproducttype = taxonomy_eduproducttype?.filter(
		(option) => option.selected === true
	);

	$: city = selectFormData?.locationOptions.map(
		(option: {
			optionValue: string;
			optionLabel: string;
			selected: boolean;
		}) => {
			return {
				value: option.optionValue,
				label: option.optionLabel,
				selected: option.selected,
			};
		}
	);

	$: selected_city = city?.filter((option) => option.selected === true);

	$: {
		console.log('selectFormData', selectFormData);
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
