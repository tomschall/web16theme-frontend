<script>
	import { _ } from 'svelte-i18n';

	export let query;
	export let handleSubmit;
	export let showSearchCategories;
	export let showIntroText;
	export let searchResults;
	export let unobserve;

	const closeSearchBar = () => {
		unobserve();
		query = '';
		searchResults = [];
		showSearchCategories = false;
		showIntroText = true;

		document
			.querySelector('.widg_searchbar-bar.show-intro.is_open')
			.classList.remove('is_open');
		window.estatico.modal.hideModal();
		window.estatico.modal.removePreventScroll();
	};
</script>

<div class="widg_searchbar-bar__search">
	<form on:submit|preventDefault={handleSubmit}>
		<div
			class="widg_searchbar-bar__close"
			data-searchbar="close"
			on:click={closeSearchBar}
		/>
		<label for="search" class="visuallyhidden">{$_('search_label')}</label>
		<input
			bind:value={query}
			type="text"
			name="searchbar_search"
			placeholder={$_('search_placeholder')}
			data-searchbar="input"
		/>
	</form>
</div>
