<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import type { CategoriesCount } from './definitions/Categories';
	import type { Item } from './definitions/Item';

	export let triggerCategorySearch = () => {};
	export let unobserve: any;
	export let searchType: string;
	export let categoriesCount: CategoriesCount;
	export let totalItems: number;
	export let template: string;

	const handleCategorySearch = (type: string) => {
		searchType = type;
		if (template == 'searchpage') unobserve();
		triggerCategorySearch();
	};
</script>

{#if categoriesCount}
	<div
		class="widg_searchbar-bar__categories"
		data-searchbar="cat"
		style="display: flex;"
		transition:fade={{ duration: 0 }}
	>
		<button
			class="button button__cat {searchType && searchType === 'all'
				? 'active'
				: ''}"
			on:click={() => {
				handleCategorySearch('all');
			}}
		>
			{$_('category_all')} ({totalItems})
		</button>
		<button
			class="button button__cat {searchType && searchType === 'studies'
				? 'active'
				: ''}"
			on:click={() => {
				handleCategorySearch('studies');
			}}
		>
			{$_('category_studys')}
			{categoriesCount.studies > 0 ? `(${categoriesCount.studies})` : ''}
		</button>
		<button
			class="button button__cat {searchType &&
			searchType === 'continuing_education'
				? 'active'
				: ''}"
			on:click={() => {
				handleCategorySearch('continuing_education');
			}}
		>
			{$_('category_education')}
			{categoriesCount.continuing_education > 0
				? `(${categoriesCount.continuing_education})`
				: ''}
		</button>
		<button
			class="button button__cat {searchType === 'event' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('event');
			}}
		>
			{$_('category_events')}
			{categoriesCount.event > 0 ? `(${categoriesCount.event})` : ''}
		</button>
		<button
			class="button button__cat {searchType === 'news' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('news');
			}}
		>
			{$_('category_news')}
			{categoriesCount.news > 0 ? `(${categoriesCount.news})` : ''}
		</button>
		<button
			class="button button__cat {searchType === 'document' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('document');
			}}
		>
			{$_('category_documents')}
			{categoriesCount.document > 0 ? `(${categoriesCount.document})` : ''}
		</button>
		<button
			class="button button__cat {searchType === 'contact' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('contact');
			}}
		>
			{$_('category_persons')}
			{categoriesCount.contact > 0 ? `(${categoriesCount.contact})` : ''}
		</button>
		<button
			class="button button__cat {searchType === 'general' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('general');
			}}
		>
			{$_('category_general')}
			{categoriesCount.general > 0 ? `(${categoriesCount.general})` : ''}
		</button>
		<button class="button button__cat ref">&nbsp;&nbsp;</button>
	</div>
{/if}
