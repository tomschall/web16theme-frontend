<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import type { Option, Primitive, ProtoOption } from './';
	import { onClickOutside } from './actions';

	export let selected: Option[] = [];
	export let selectedLabels: Primitive[] = [];
	export let options: ProtoOption[];
	export let id: string | undefined = undefined;
	export let activeOption: Option | null = null;
	export let dropDownLabel: String = '';
	export let setMultiSelectWidth: String = '';

	let showOptions: boolean = false;
	let multiselectElement: any;
	let dropDownFirstHover: boolean = false;
	let selectLabel: string;
	let maxChar: number;

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
	$: {
		let strArr = [];
		let selectedClone = [...selected];
		console.log('selectedClone', selectedClone);
		selectedClone.reverse().forEach((element, i) => {
			if (i < selected.length - 1) {
				strArr.push(`${element.label},`);
			} else if (i === selected.length - 1) {
				strArr.push(`${element.label}`);
			}
		});

		maxChar = Math.round((multiselectElement?.scrollWidth - 20) / 9);
		selectLabel = strArr.join(' ').slice(0, maxChar);

		checkIfTheDotsAreNeeded(selectedClone);
	}

	const checkIfTheDotsAreNeeded = (selectedClone: any[]) => {
		if (selectLabel.charAt(selectLabel.length - 1) === ',') {
			selectLabel =
				selectedClone.length > 1
					? selectLabel.substring(0, selectLabel.length - 1) + '...'
					: selectLabel.substring(0, selectLabel.length - 1);
		} else if (
			selectLabel.charAt(selectLabel.length - 1) === ' ' ||
			selectLabel.charAt(selectLabel.length - 1) === '&'
		) {
			selectLabel =
				selectedClone.length > 1
					? selectLabel.substring(0, selectLabel.length - 2) + '...'
					: selectLabel.substring(0, selectLabel.length - 2);
		} else if (selectLabel.charAt(selectLabel.length - 2) === ' ') {
			selectLabel =
				selectedClone.length > 1
					? selectLabel.substring(0, selectLabel.length - 3) + '...'
					: selectLabel.substring(0, selectLabel.length - 3);
		} else if (
			selectLabel !== '' &&
			(selectLabel.length === maxChar - 1 || selectLabel.length === maxChar)
		) {
			if (
				selectedClone.length > 1 &&
				!selectLabel.includes(selectedClone[selectedClone.length - 1].label)
			) {
				selectLabel = selectLabel + '...';
			}
		}
	};

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
		dropDownFirstHover = false;
	};
</script>

<div
	{id}
	class="multiselect {selected.length > 0 ? 'has_selection' : ''}"
	style="min-width: {setMultiSelectWidth}; {showOptions
		? `z-index: 2; `
		: ''}width: {multiselectElement?.offsetWidth}px"
	bind:this={multiselectElement}
	on:mouseup|stopPropagation={() =>
		showOptions === false ? setOptionsVisible(true) : setOptionsVisible(false)}
	use:onClickOutside={() => setOptionsVisible(false)}
	use:onClickOutside={() => dispatch(`blur`)}
>
	<span class={selected.length === 0 ? 'label' : 'label__top'}>
		{$_(`${dropDownLabel}`)}
	</span>
	<button
		on:click={() => {
			selected = [];
			showOptions = false;
		}}
	/>
	<ul
		class="selected {showOptions ? 'active' : ''}"
		style="width: {multiselectElement?.scrollWidth}px"
		bind:this={multiselectElement}
	>
		<li>
			{selectLabel}
		</li>
	</ul>

	<ul class="options" class:hidden={!showOptions}>
		{#each matchingOptions as { label }, i}
			<li
				on:mouseenter={() => {
					dropDownFirstHover = true;
				}}
				on:mousedown|preventDefault|stopPropagation={() => {
					isSelected(label) ? remove(label) : add(label);
					dropDownFirstHover = false;
				}}
				class:selected={isSelected(label)}
				class={i === 0 && selected.length === 0 && dropDownFirstHover === false
					? 'default__first_option'
					: ''}
			>
				{label}
			</li>
		{/each}
	</ul>
</div>
