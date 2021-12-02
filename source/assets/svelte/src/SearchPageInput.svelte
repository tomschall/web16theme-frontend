<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Item } from './definitions/Item';

	export let query: string;
	export let searchResults: Item[];
	export let showSearchCategories: boolean;
	export let showSearchBarIntro: boolean;
	export let showSearchProposals: boolean;
	export let showStatusInfo: boolean;
	export let unobserve: any;
	export let handleInput: () => void;
	export let searchTermSpellCheck: string;
	export let searchType: string;

	const resetSearch = () => {
		query = '';
		searchResults = [];
		showSearchCategories = false;
		showSearchBarIntro = true;
		showStatusInfo = false;
		showSearchProposals = false;
		searchTermSpellCheck = null;
		searchType = '';
		unobserve();

		document
			.querySelector('.widg_searchbar-bar.show-intro.is_open')
			.classList.remove('is_open');
		window.estatico.modal.hideModal();
		window.estatico.modal.removePreventScroll();
	};
</script>

<div class="widg_searchbar-bar__search">
  searchpageinput
	<form autocomplete="off" on:submit|preventDefault>
		<div
			class="widg_searchbar-bar__close"
			data-searchbar="close"
			on:click={resetSearch}
		/>
		<label for="search" class="visuallyhidden">{$_('search_label')}</label>
		<input
			bind:value={query}
			on:input={handleInput}
			type="text"
			name="searchbar_search"
			placeholder={$_('search_placeholder')}
			data-searchbar="input"
		/>
	</form>
</div>
