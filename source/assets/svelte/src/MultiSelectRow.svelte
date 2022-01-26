<script lang="ts">
	import MultiSelect from './multiselect';

	export let handleInput: () => void;

	let multiSelectTypeLabel = {
		subjectarea: 'multiple_label_subjectarea',
		type: 'multiple_label_type',
		location: 'multiple_label_location',
	};

	let taxonomy_subjectarea = [
		{ value: 1000, label: 'Architektur, Bau & Geomatik' },
		{ value: 1001, label: 'Gestaltung & Kunst' },
		{ value: 1002, label: 'Informatik' },
		{ value: 1003, label: 'International Studies' },
		{ value: 1004, label: 'Life Sciences' },
		{ value: 1005, label: 'Musik' },
		{ value: 1006, label: 'Pädagogik' },
		{ value: 1007, label: 'Psychologie' },
		{ value: 1008, label: 'Soziale Arbeit' },
		{ value: 1009, label: 'Technik' },
		{ value: 1010, label: 'Wirtschaft' },
	];
	export let selected_taxonomy_subjectarea = [];

	let taxonomy_eduproducttype = [
		{ value: 2000, label: 'CAS' },
		{ value: 2001, label: 'DAS' },
		{ value: '5d0fqcxtfd', label: 'Fachseminar' },
		{ value: 2006, label: 'Fachtagung' },
		{ value: 2007, label: 'Kurs' },
		{ value: 2008, label: 'MAS' },
		{ value: 'pqowmis6ev', label: 'MBA' },
		{ value: 2013, label: 'Seminar' },
		{ value: 2016, label: 'Summer School' },
		{ value: 2018, label: 'Tagung' },
		{ value: 2025, label: 'Winter School' },
	];
	export let selected_taxonomy_eduproducttype = [];

	let city = [
		{ value: 'muttenz', label: 'Muttenz' },
		{ value: 'basel', label: 'Basel' },
		{ value: 'brugg-windisch', label: 'Brugg-Windisch' },
		{ value: 'solothurn', label: 'Solothurn' },
	];
	export let selected_city = [];
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
