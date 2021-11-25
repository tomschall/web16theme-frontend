<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';

	export let triggerCategorySearch = () => {};
	export let selectedCategory: string;
	export let totalItems: number;
</script>

<div
	class="widg_searchbar-bar__categories"
	data-searchbar="cat"
	style="display: flex;"
	transition:fade={{ duration: 0 }}
>
	<button
		class="button button__cat {selectedCategory === 'all' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'all';
			triggerCategorySearch();
		}}
	>
		{$_('category_all')} ({totalItems})
	</button>
	<button
		class="button button__cat {selectedCategory === 'studies' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'studies';
			triggerCategorySearch();
		}}
	>
		{$_('category_studys')} (1000)
	</button>
	<button
		class="button button__cat {selectedCategory === 'continuing_education'
			? 'active'
			: ''}"
		on:click={() => {
			selectedCategory = 'continuing_education';
			triggerCategorySearch();
		}}
	>
		{$_('category_education')} (15)
	</button>
	<button
		class="button button__cat {selectedCategory === 'event' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'event';
			triggerCategorySearch();
		}}
	>
		{$_('category_events')} (1)
	</button>
	<button
		class="button button__cat {selectedCategory === 'news' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'news';
			triggerCategorySearch();
		}}
	>
		{$_('category_news')} (53)
	</button>
	<button
		class="button button__cat {selectedCategory === 'document' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'document';
			triggerCategorySearch();
		}}
	>
		{$_('category_documents')} (1946)
	</button>
	<button
		class="button button__cat {selectedCategory === 'contact' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'contact';
			triggerCategorySearch();
		}}
	>
		{$_('category_persons')} (26)
	</button>
	<button
		class="button button__cat {selectedCategory === 'general' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'general';
			triggerCategorySearch();
		}}
	>
		{$_('category_general')} (504)
	</button>
	<button class="button button__cat ref">&nbsp;&nbsp;</button>
</div>
