<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let query: string;
	export let handleInput: () => void;
</script>

<div class="search__string svelte_search">
	<form autocomplete="off" on:submit|preventDefault>
		<input
			bind:value={query}
			on:input={handleInput}
			type="text"
			name="searchbar_search"
			placeholder={$_('search_placeholder')}
			data-searchbar="input"
		/>
		<label for="search" class="visuallyhidden">{$_('search_label')}</label>
	</form>
</div>
