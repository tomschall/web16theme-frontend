<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import type { Option, Primitive, ProtoOption } from './';
	import { onClickOutside } from './actions';

	export let selected: Option[] = [];
	export let selectedLabels: Primitive[] = [];
	export let selectedValues: Primitive[] = [];
	export let options: ProtoOption[];
	export let id: string | undefined = undefined;
	export let activeOption: Option | null = null;
	export let dropDownLabel: String = '';

	let multiselectElement;
	let showOptions = false;
	const dispatch = createEventDispatcher();

	onMount(() => {
		selected = _options.filter((op) => op?.preselected);
	});

	$: _options = options.map((rawOp) => {
		const op = { ...(rawOp as Option) };
		if (!op.value) op.value = op.label;
		return op;
	}) as Option[];

	$: selectedLabels = selected.map((op) => op.label);
	console.log('selected', selected);

	$: selectedValues = selected.map((op) => op.value);
	$: matchingOptions = _options.filter((op) => {
		return `${op.label}`.toLowerCase();
	});
	$: matchingEnabledOptions = matchingOptions.filter((op) => !op.disabled);
	$: if (
		(activeOption &&
			!matchingEnabledOptions
				.map((op) => op.label)
				.includes(activeOption.label)) ||
		!activeOption
	)
		activeOption = matchingEnabledOptions[0];
	$: isSelected = (label: Primitive) => selectedLabels.includes(label);

	console.log(options);

	const add = (label: Primitive) => {
		const option = _options.find((op) => op.label === label);
		if (!option) {
			console.error(`MultiSelect: option with label ${label} not found`);
			return;
		}

		selected = [option, ...selected];

		dispatch(`add`, { option });
		dispatch(`change`, { option, type: `add` });
	};

	const remove = (label: Primitive) => {
		if (selected.length === 0) return;
		selected = selected.filter((option) => label !== option.label);
		const option = _options.find((option) => option.label === label);
		dispatch(`remove`, { option });
		dispatch(`change`, { option, type: `remove` });
	};

	const setOptionsVisible = (show: boolean) => {
		if (show === showOptions) return;
		showOptions = show;
	};
</script>

<div
	{id}
	class="multiselect"
	style={showOptions ? `z-index: 2;` : undefined}
	on:mouseup|stopPropagation={() => setOptionsVisible(true)}
	use:onClickOutside={() => setOptionsVisible(false)}
	use:onClickOutside={() => dispatch(`blur`)}
>
	<span class={selected.length === 0 ? 'label' : 'label__top'}>
		{$_(`${dropDownLabel}`)}
	</span>
	<ul
		class="selected {showOptions ? 'active' : ''}"
		style="width: {multiselectElement?.offsetWidth}px"
		bind:this={multiselectElement}
	>
		{#each selected as { label }}
			<li on:mouseup|self|stopPropagation={() => setOptionsVisible(true)}>
				{label},
			</li>
		{/each}
	</ul>

	<ul class="options" class:hidden={!showOptions}>
		{#each matchingOptions as { label }, i}
			<li
				on:mouseup|preventDefault|stopPropagation
				on:mousedown|preventDefault|stopPropagation={() => {
					isSelected(label) ? remove(label) : add(label);
					showOptions = false;
				}}
				class:selected={isSelected(label)}
				class={i === 0 && selected.length === 0 ? 'default__first_option' : ''}
			>
				{label}
			</li>
		{/each}
	</ul>
</div>
