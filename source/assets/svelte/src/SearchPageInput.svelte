<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import type { Item } from './definitions/Item';

	export let query: string;
	export let showSearchCategories: boolean;
	export let showSearchBarIntro: boolean;
	export let searchResults: Item[];
	export let showStatusInfo: boolean;
	export let showSearchProposals: boolean;
	export let searchTermSpellCheck: string;
	export let searchType: string;
	export let handleInput: () => void;
	let ref = null;

	onMount(() => ref.focus());

	const handleClick = () => {
		query = '';
		searchResults = [];
		showSearchCategories = false;
		showSearchBarIntro = true;
		showSearchProposals = false;
		showStatusInfo = false;
		searchTermSpellCheck = null;
		searchType = 'all';
	};
</script>

<div class="search__string svelte_search">
	<form autocomplete="off" on:submit|preventDefault>
		<label for="searchpage_input" class="visuallyhidden"
			>{$_('search_label')}</label
		>
		<input
			id="searchpage_input"
			bind:value={query}
			bind:this={ref}
			on:input={handleInput}
			type="text"
			name="searchpage_search"
			placeholder={$_('search_placeholder')}
			data-searchbar="input"
		/>
		<a on:click={handleClick} href={void 0} class="search__string__clear"
			><i /></a
		>
	</form>
</div>
