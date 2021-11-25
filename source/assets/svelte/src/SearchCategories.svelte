<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import type { CategoriesCount } from './definitions/Categories';
	import type { Item } from './definitions/Item';

	export let triggerCategorySearch = () => {};
	export let selectedCategory: string;
	export let totalItems: number;
	export let searchResults: Item[];
	export let categoriesCount: CategoriesCount;
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
		{$_('category_all')}
		{categoriesCount.all > 0 ? '(' + categoriesCount.all + ')' : ''}
	</button>
	<button
		class="button button__cat {selectedCategory === 'studies' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'studies';
			triggerCategorySearch();
		}}
	>
		{$_('category_studys')}
		{categoriesCount.studies > 0 ? '(' + categoriesCount.studies + ')' : ''}
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
		{$_('category_education')}
		{categoriesCount.continuing_education > 0
			? '(' + categoriesCount.continuing_education + ')'
			: ''}
	</button>
	<button
		class="button button__cat {selectedCategory === 'event' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'event';
			triggerCategorySearch();
		}}
	>
		{$_('category_events')}
		{categoriesCount.event > 0 ? '(' + categoriesCount.event + ')' : ''}
	</button>
	<button
		class="button button__cat {selectedCategory === 'news' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'news';
			triggerCategorySearch();
		}}
	>
		{$_('category_news')}
		{categoriesCount.news > 0 ? '(' + categoriesCount.news + ')' : ''}
	</button>
	<button
		class="button button__cat {selectedCategory === 'document' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'document';
			triggerCategorySearch();
		}}
	>
		{$_('category_documents')}
		{categoriesCount.document > 0 ? '(' + categoriesCount.document + ')' : ''}
	</button>
	<button
		class="button button__cat {selectedCategory === 'contact' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'contact';
			triggerCategorySearch();
		}}
	>
		{$_('category_persons')}
		{categoriesCount.contact > 0 ? '(' + categoriesCount.contact + ')' : ''}
	</button>
	<button
		class="button button__cat {selectedCategory === 'general' ? 'active' : ''}"
		on:click={() => {
			selectedCategory = 'general';
			triggerCategorySearch();
		}}
	>
		{$_('category_general')}
		{categoriesCount.general > 0 ? '(' + categoriesCount.general + ')' : ''}
	</button>
	<button class="button button__cat ref">&nbsp;&nbsp;</button>
</div>
