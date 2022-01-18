<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { Option, Primitive, ProtoOption } from './';
	import { onClickOutside } from './actions';
	import { CrossIcon, ExpandIcon, ReadOnlyIcon } from './icons';
	export let selected: Option[] = [];
	export let selectedLabels: Primitive[] = [];
	export let selectedValues: Primitive[] = [];
	export let maxSelect: number | null = null; // null means any number of options are selectable
	export let maxSelectMsg = (current: number, max: number) =>
		`${current}/${max}`;
	export let readonly = false;
	export let options: ProtoOption[];
	export let input: HTMLInputElement | null = null;
	export let placeholder: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let noOptionsMsg = `No matching options`;
	export let activeOption: Option | null = null;
	export let outerDivClass = ``;
	export let ulSelectedClass = ``;
	export let liSelectedClass = ``;
	export let ulOptionsClass = ``;
	export let liOptionClass = ``;
	export let removeBtnTitle = `Remove`;
	export let removeAllTitle = `Remove all`;
	// https://github.com/sveltejs/svelte/issues/6964
	export let defaultDisabledTitle = `This option is disabled`;
	if (maxSelect !== null && maxSelect < 0) {
		console.error(
			`maxSelect must be null or positive integer, got ${maxSelect}`
		);
	}
	if (!(options?.length > 0)) console.error(`MultiSelect missing options`);
	if (!Array.isArray(selected)) console.error(`selected prop must be an array`);
	onMount(() => {
		selected = _options.filter((op) => op?.preselected);
	});
	function isObject(item: unknown) {
		return typeof item === `object` && !Array.isArray(item) && item !== null;
	}
	// process proto options to full ones with mandatory labels
	$: _options = options.map((rawOp) => {
		// convert to objects internally if user passed list of strings or numbers as options
		if (isObject(rawOp)) {
			const op = { ...(rawOp as Option) };
			if (!op.value) op.value = op.label;
			return op;
		} else {
			if (![`string`, `number`].includes(typeof rawOp)) {
				console.error(
					`MultiSelect options must be objects, strings or numbers, got ${typeof rawOp}`
				);
			}
			// even if we logged error above, try to proceed hoping user knows what they're doing
			return { label: rawOp, value: rawOp };
		}
	}) as Option[];
	$: labels = _options.map((op) => op.label);
	$: if (new Set(labels).size !== options.length) {
		console.error(
			`Option labels must be unique. Duplicates found: ${labels.filter(
				(label, idx) => labels.indexOf(label) !== idx
			)}`
		);
	}
	$: selectedLabels = selected.map((op) => op.label);
	$: selectedValues = selected.map((op) => op.value);
	const dispatch = createEventDispatcher();
	let searchText = ``;
	let showOptions = false;
	// options matching the current search text
	$: matchingOptions = _options.filter((op) => {
		if (!searchText) return true;
		return `${op.label}`.toLowerCase().includes(searchText.toLowerCase());
	});
	$: matchingEnabledOptions = matchingOptions.filter((op) => !op.disabled);
	$: if (
		// if there was an active option but it's not in the filtered list of options
		(activeOption &&
			!matchingEnabledOptions
				.map((op) => op.label)
				.includes(activeOption.label)) ||
		// or there's no active option but the user entered search text
		(!activeOption && searchText)
	)
		// make the first filtered option active
		activeOption = matchingEnabledOptions[0];
	function add(label: Primitive) {
		if (
			!readonly &&
			!selectedLabels.includes(label) &&
			// for maxselect = 1 we always replace current option with new selection
			(maxSelect == null || maxSelect == 1 || selected.length < maxSelect)
		) {
			searchText = ``; // reset search string on selection
			const option = _options.find((op) => op.label === label);
			if (!option) {
				console.error(`MultiSelect: option with label ${label} not found`);
				return;
			}
			if (maxSelect === 1) {
				selected = [option];
			} else {
				selected = [option, ...selected];
			}
			if (selected.length === maxSelect) setOptionsVisible(false);
			dispatch(`add`, { option });
			dispatch(`change`, { option, type: `add` });
		}
	}
	function remove(label: Primitive) {
		if (selected.length === 0 || readonly) return;
		selected = selected.filter((option) => label !== option.label);
		const option = _options.find((option) => option.label === label);
		dispatch(`remove`, { option });
		dispatch(`change`, { option, type: `remove` });
	}
	function setOptionsVisible(show: boolean) {
		// nothing to do if visibility is already as intended
		if (readonly || show === showOptions) return;
		showOptions = show;
		if (show) input?.focus();
		else {
			input?.blur();
			activeOption = null;
		}
	}
	// handle all keyboard events this component receives
	function handleKeydown(event: KeyboardEvent) {
		// on escape: dismiss options dropdown and reset search text
		if (event.key === `Escape`) {
			setOptionsVisible(false);
			searchText = ``;
		}
		// on enter key: toggle active option and reset search text
		else if (event.key === `Enter`) {
			if (activeOption) {
				const { label } = activeOption;
				selectedLabels.includes(label) ? remove(label) : add(label);
				searchText = ``;
			} // no active option means the options dropdown is closed in which case enter means open it
			else setOptionsVisible(true);
		}
		// on up/down arrow keys: update active option
		else if ([`ArrowDown`, `ArrowUp`].includes(event.key)) {
			if (activeOption === null) {
				// if no option is active yet, make first one active
				activeOption = matchingEnabledOptions[0];
				return;
			}
			const increment = event.key === `ArrowUp` ? -1 : 1;
			const newActiveIdx =
				matchingEnabledOptions.indexOf(activeOption) + increment;
			const ulOps = document.querySelector(`ul.options`);
			if (newActiveIdx < 0) {
				// wrap around top
				activeOption =
					matchingEnabledOptions[matchingEnabledOptions.length - 1];
				if (ulOps) ulOps.scrollTop = ulOps.scrollHeight;
			} else if (newActiveIdx === matchingEnabledOptions.length) {
				// wrap around bottom
				activeOption = matchingEnabledOptions[0];
				if (ulOps) ulOps.scrollTop = 0;
			} else {
				// default case
				activeOption = matchingEnabledOptions[newActiveIdx];
				const li: any = document.querySelector(`ul.options > li.active`);
				// scrollIntoViewIfNeeded() scrolls top edge of element into view so when moving
				// downwards, we scroll to next sibling to make element fully visible
				if (increment === 1) li?.nextSibling?.scrollIntoViewIfNeeded();
				else li?.scrollIntoViewIfNeeded();
			}
		} else if (event.key === `Backspace`) {
			const label = selectedLabels.pop();
			if (label && !searchText) remove(label);
		}
	}
	const removeAll = () => {
		dispatch(`removeAll`, { options: selected });
		dispatch(`change`, { options: selected, type: `removeAll` });
		selected = [];
		searchText = ``;
	};
	$: isSelected = (label: Primitive) => selectedLabels.includes(label);
	const handleEnterAndSpaceKeys =
		(handler: () => void) => (event: KeyboardEvent) => {
			if ([`Enter`, `Space`].includes(event.code)) {
				event.preventDefault();
				handler();
			}
		};
</script>

<!-- z-index: 2 when showOptions is true ensures the ul.selected of one <MultiSelect />
display above those of another following shortly after it -->
<div
	{id}
	class="multiselect {outerDivClass}"
	class:readonly
	class:single={maxSelect == 1}
	style={showOptions ? `z-index: 2;` : undefined}
	on:mouseup|stopPropagation={() => setOptionsVisible(true)}
	use:onClickOutside={() => setOptionsVisible(false)}
	use:onClickOutside={() => dispatch(`blur`)}
>
	<ul class="selected {ulSelectedClass}">
		{#if maxSelect == 1 && selected[0]?.label}
			<span on:mouseup|self|stopPropagation={() => setOptionsVisible(true)}>
				{selected[0].label}
			</span>
		{:else}
			{#each selected as { label }}
				<li
					class={liSelectedClass}
					on:mouseup|self|stopPropagation={() => setOptionsVisible(true)}
				>
					{label}
					{#if !readonly}
						<button
							on:mouseup|stopPropagation={() => remove(label)}
							on:keydown={handleEnterAndSpaceKeys(() => remove(label))}
							type="button"
							title="{removeBtnTitle} {label}"
						>
							<CrossIcon height="12pt" />
						</button>
					{/if}
				</li>
			{/each}
		{/if}
		<input
			bind:this={input}
			autocomplete="off"
			bind:value={searchText}
			on:mouseup|self|stopPropagation={() => setOptionsVisible(true)}
			on:keydown={handleKeydown}
			on:focus={() => setOptionsVisible(true)}
			{name}
			placeholder={selectedLabels.length ? `` : placeholder}
		/>
	</ul>
	<!-- {#if readonly}
		<ReadOnlyIcon height="14pt" /> -->
	<!-- {:else if selected.length > 0}
		{#if maxSelect !== null && maxSelect > 1}
			<span style="padding: 0 3pt;"
				>{maxSelectMsg(selected.length, maxSelect)}</span
			>
		{/if}
		<button
			type="button"
			class="remove-all"
			title={removeAllTitle}
			on:mouseup|stopPropagation={removeAll}
			on:keydown={handleEnterAndSpaceKeys(removeAll)}
		>
			<CrossIcon height="14pt" />
		</button>
	{/if} -->
	{#key showOptions}
		<ul class="options {ulOptionsClass}" class:hidden={!showOptions}>
			{#each matchingOptions as { label, disabled, title = null, selectedTitle, disabledTitle = defaultDisabledTitle }}
				<li
					on:mouseup|preventDefault|stopPropagation
					on:mousedown|preventDefault|stopPropagation={() => {
						if (disabled) return;
						isSelected(label) ? remove(label) : add(label);
					}}
					class:selected={isSelected(label)}
					class:active={activeOption?.label === label}
					class:disabled
					title={disabled
						? disabledTitle
						: (isSelected(label) && selectedTitle) || title}
					class={liOptionClass}
				>
					{label}
				</li>
			{:else}
				{noOptionsMsg}
			{/each}
		</ul>
	{/key}
</div>
