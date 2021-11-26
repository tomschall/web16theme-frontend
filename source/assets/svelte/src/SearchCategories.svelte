<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import type { CategoriesCount } from './definitions/Categories';
	import type { Item } from './definitions/Item';

	export let triggerCategorySearch = () => {};
	export let searchType: string;
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
		class="button button__cat {searchType === 'all' ? 'active' : ''}"
		on:click={() => {
			searchType = 'all';
			triggerCategorySearch();
		}}
	>
		{$_('category_all')}
		{categoriesCount.all > 0 ? '(' + categoriesCount.all + ')' : ''}
	</button>
	<button
		class="button button__cat {searchType === 'studies' ? 'active' : ''}"
		on:click={() => {
			searchType = 'studies';
			triggerCategorySearch();
		}}
	>
		{$_('category_studys')}
		{categoriesCount.studies > 0 ? '(' + categoriesCount.studies + ')' : ''}
	</button>
	<button
		class="button button__cat {searchType === 'continuing_education'
			? 'active'
			: ''}"
		on:click={() => {
			searchType = 'continuing_education';
			triggerCategorySearch();
		}}
	>
		{$_('category_education')}
		{categoriesCount.continuing_education > 0
			? '(' + categoriesCount.continuing_education + ')'
			: ''}
	</button>
	<button
		class="button button__cat {searchType === 'event' ? 'active' : ''}"
		on:click={() => {
			searchType = 'event';
			triggerCategorySearch();
		}}
	>
		{$_('category_events')}
		{categoriesCount.event > 0 ? '(' + categoriesCount.event + ')' : ''}
	</button>
	<button
		class="button button__cat {searchType === 'news' ? 'active' : ''}"
		on:click={() => {
			searchType = 'news';
			triggerCategorySearch();
		}}
	>
		{$_('category_news')}
		{categoriesCount.news > 0 ? '(' + categoriesCount.news + ')' : ''}
	</button>
	<button
		class="button button__cat {searchType === 'document' ? 'active' : ''}"
		on:click={() => {
			searchType = 'document';
			triggerCategorySearch();
		}}
	>
		{$_('category_documents')}
		{categoriesCount.document > 0 ? '(' + categoriesCount.document + ')' : ''}
	</button>
	<button
		class="button button__cat {searchType === 'contact' ? 'active' : ''}"
		on:click={() => {
			searchType = 'contact';
			triggerCategorySearch();
		}}
	>
		{$_('category_persons')}
		{categoriesCount.contact > 0 ? '(' + categoriesCount.contact + ')' : ''}
	</button>
	<button
		class="button button__cat {searchType === 'general' ? 'active' : ''}"
		on:click={() => {
			searchType = 'general';
			triggerCategorySearch();
		}}
	>
		{$_('category_general')}
		{categoriesCount.general > 0 ? '(' + categoriesCount.general + ')' : ''}
	</button>
	<button class="button button__cat ref">&nbsp;&nbsp;</button>
</div>
