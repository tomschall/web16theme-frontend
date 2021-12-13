<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';

	export let query: string;
	export let handleInput: () => void;
	export let ref = null;

	onMount(() => ref.focus());
</script>

<div class="search__string svelte_search">
	<form autocomplete="off" on:submit|preventDefault>
		<input
			bind:value={query}
			bind:this={ref}
			on:input={handleInput}
			type="text"
			name="searchbar_search"
			placeholder={$_('search_placeholder')}
			data-searchbar="input"
		/>
		<label for="search" class="visuallyhidden">{$_('search_label')}</label>
	</form>
</div>
