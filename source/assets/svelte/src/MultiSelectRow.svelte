<script lang="ts">
	import Select from 'svelte-select';
	import MultiSelect from './multiselect';

	export let searchType: string;
	export let unobserve: any;
	export let template: string;
	export let triggerCategorySearch = () => {};

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
	];

	export let selected_city = [];

	const handleCategorySearch = (type: string) => {
		searchType = type;
		if (template == 'searchpage') unobserve();
		triggerCategorySearch();
	};
</script>

<div class="search__holder select2__wrapper themed">
	<MultiSelect
		bind:selected={selected_taxonomy_subjectarea}
		options={taxonomy_subjectarea}
	/>
</div>

<div class="search__holder select2__wrapper themed">
	<MultiSelect
		bind:selected={selected_taxonomy_eduproducttype}
		options={taxonomy_eduproducttype}
	/>
</div>

<div class="search__holder select2__wrapper themed">
	<MultiSelect bind:selected={selected_city} options={city} />
</div>

<style>
	.themed {
		--border: 2px solid #deded9;
		--borderRadius: 0;
		--placeholderColor: #000;
		--height: 60px !important;
	}
</style>
