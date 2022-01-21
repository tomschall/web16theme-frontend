<script lang="ts">
	import MultiSelect, { Primitive } from './multiselect';

	export let searchType: string;
	export let unobserve: any;
	export let template: string;
	export let triggerCategorySearch = () => {};
	export let handleInput: () => void;

	let multiSelectTypeLabel = {
		subjectarea: 'multiple_label_subjectarea',
		type: 'multiple_label_type',
		location: 'multiple_label_location',
	};

	let taxonomy_subjectarea = [
		{ value: 1002, label: 'Informatik' },
		{ value: 1003, label: 'International Studies' },
		{ value: 1004, label: 'Life Sciences' },
	];

	export let selected_taxonomy_subjectarea = [];

	let taxonomy_eduproducttype = [
		{ value: 2000, label: 'CAS' },
		{ value: 2001, label: 'DAS' },
		{ value: 2008, label: 'MAS' },
	];

	export let selected_taxonomy_eduproducttype = [];

	let city = [
		{ value: 'muttenz', label: 'Muttenz' },
		{ value: 'basel', label: 'Basel' },
		{ value: 'brugg-windisch', label: 'Brugg-Windisch' },
		{ value: 'solothurn', label: 'Solothurn' },
	];

	export let selected_city = [];

	const handleCategorySearch = (type: string) => {
		searchType = type;
		if (template == 'searchpage') unobserve();
		triggerCategorySearch();
	};
</script>

<MultiSelect
	bind:selected={selected_taxonomy_subjectarea}
	options={taxonomy_subjectarea}
	dropDownLabel={multiSelectTypeLabel.subjectarea}
	on:change={handleInput}
/>

<MultiSelect
	bind:selected={selected_taxonomy_eduproducttype}
	options={taxonomy_eduproducttype}
	dropDownLabel={multiSelectTypeLabel.type}
	on:change={handleInput}
/>

<MultiSelect
	bind:selected={selected_city}
	options={city}
	dropDownLabel={multiSelectTypeLabel.location}
	on:change={handleInput}
/>
