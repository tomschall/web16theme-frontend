<script lang="ts">
	import Select from 'svelte-select';

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
</script>

<div class="search__holder select2__wrapper">
	<Select
		isMulti={true}
		bind:value={selected_taxonomy_subjectarea}
		on:change={() => console.log('event fired selected_taxonomy_subjectarea')}
		items={taxonomy_subjectarea}
	/>
</div>

<div class="search__holder select2__wrapper">
	<Select
		isMulti={true}
		bind:value={selected_taxonomy_eduproducttype}
		on:change={() =>
			console.log('event fired selected_taxonomy_eduproducttype')}
		items={taxonomy_eduproducttype}
	/>
</div>

<div class="search__holder select2__wrapper">
	<Select
		isMulti={true}
		bind:value={selected_city}
		on:change={() => console.log('event fired selected_city')}
		items={city}
	/>
</div>
