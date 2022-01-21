<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Item } from './definitions/Item';

	export let query: string;
	export let searchResults: Item[];
	export let showStatusInfo: boolean;
	export let showSearchProposals: boolean;
	export let searchTermSpellCheck: string;
	export let searchType: string;
	export let handleInput: () => void;
	export let toggleState: boolean = false;

	let ref: HTMLInputElement = null;

	const handleClick = () => {
		query = '';
		searchResults = [];
		showSearchProposals = false;
		showStatusInfo = false;
		searchTermSpellCheck = null;
		searchType = 'continuing_education';
		toggleState = false;
	};

	const toggleLabel = () => {
		if (toggleState === false && query.length === 0) {
			toggleState = true;
			ref.focus();
		} else if (query.length === 0) {
			toggleState = false;
		} else if (query.length > 0) {
			toggleState = true;
		}
	};
</script>

<div class="search__holder__searchstring">
	<div class="search__string">
		<form autocomplete="off" on:submit|preventDefault>
			<input
				style={toggleState === true ? 'padding-top: 30px' : ''}
				bind:value={query}
				bind:this={ref}
				on:input={handleInput}
				on:input={toggleLabel}
				on:click={toggleLabel}
				on:blur={toggleLabel}
				type="text"
				name="searchbar_search"
				data-searchbar="input"
			/>
			<label
				for="search"
				class="searchbar_search {toggleState === true ? 'toggle__top' : ''}"
				on:click={toggleLabel}>{$_('multiple_label_search')}</label
			>
			<a on:click={handleClick} href={void 0} class="search__string__clear"
				><i /></a
			>
		</form>
	</div>
</div>
