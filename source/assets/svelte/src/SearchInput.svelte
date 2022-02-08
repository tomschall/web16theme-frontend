<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Item } from './definitions/Item';

	export let query: string;
	export let searchResults: Item[];
	export let showStatusInfo: boolean;
	export let searchType: string;
	export let handleInput: () => void;
	export let toggleState: boolean = false;

	let ref: HTMLInputElement = null;

	$: if (query.length === 0) {
		toggleState = false;
	}

	const handleClick = () => {
		query = '';
		searchResults = [];
		showStatusInfo = false;
		searchType = 'continuing_education';
		toggleState = false;
		handleInput();
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
			/>
			<label
				for="search"
				class="searchbar_search {toggleState === true ? 'toggle__top' : ''}"
				on:click={toggleLabel}>{$_('multiple_label_search')}</label
			>
			<a
				class="search__string__clear"
				style={query.length === 0 ? 'display: none' : ''}
				on:click={handleClick}
				href={void 0}
				><i />
			</a>
		</form>
	</div>
</div>
