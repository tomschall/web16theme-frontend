<script>
	import { _ } from 'svelte-i18n';

	export let query;
	export let searchResults;
	export let showSearchCategories;
	export let showSearchBarIntro;
	export let showStatusInfo;
	export let unobserve;
	export let handleInput;

	const closeSearchBar = () => {
		query = '';
		searchResults = [];
		showSearchCategories = false;
		showSearchBarIntro = true;
		showStatusInfo = false;
		unobserve();

		document
			.querySelector('.widg_searchbar-bar.show-intro.is_open')
			.classList.remove('is_open');
		window.estatico.modal.hideModal();
		window.estatico.modal.removePreventScroll();
	};
</script>

<div class="widg_searchbar-bar__search">
	<form autocomplete="off" on:submit|preventDefault>
		<div
			class="widg_searchbar-bar__close"
			data-searchbar="close"
			on:click={closeSearchBar}
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
