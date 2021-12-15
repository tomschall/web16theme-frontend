<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import type { CategoriesCount } from './definitions/Categories';

	export let triggerCategorySearch = () => {};
	export let unobserve: any;
	export let searchType: string;
	export let categoriesCount: CategoriesCount;
	export let template: string;

	let zeroResult: string = '(0)';
	let mq = window.estatico.mq.query({ from: 'small' }); // Estatico

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
			disabled={categoriesCount.all > 0 ? false : true}
		>
			{$_('category_all')} ({categoriesCount.all})
		</button>
		<button
			class="button button__cat {searchType && searchType === 'studies'
				? 'active'
				: ''}"
			on:click={() => {
				handleCategorySearch('studies');
			}}
			disabled={categoriesCount.studies > 0 ? false : true}
		>
			{$_('category_studys')}
			{categoriesCount.studies > 0
				? `(${categoriesCount.studies})`
				: zeroResult}
		</button>
		<button
			class="button button__cat {searchType &&
			searchType === 'continuing_education'
				? 'active'
				: ''}"
			on:click={() => {
				handleCategorySearch('continuing_education');
			}}
			disabled={categoriesCount.continuing_education > 0 ? false : true}
		>
			{$_('category_education')}
			{categoriesCount.continuing_education > 0
				? `(${categoriesCount.continuing_education})`
				: zeroResult}
		</button>
		<button
			class="button button__cat {searchType === 'event' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('event');
			}}
			disabled={categoriesCount.event > 0 ? false : true}
		>
			{$_('category_events')}
			{categoriesCount.event > 0 ? `(${categoriesCount.event})` : zeroResult}
		</button>
		<button
			class="button button__cat {searchType === 'news' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('news');
			}}
			disabled={categoriesCount.news > 0 ? false : true}
		>
			{$_('category_news')}
			{categoriesCount.news > 0 ? `(${categoriesCount.news})` : zeroResult}
		</button>
		<button
			class="button button__cat {searchType === 'document' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('document');
			}}
			disabled={categoriesCount.document > 0 ? false : true}
		>
			{$_('category_documents')}
			{categoriesCount.document > 0
				? `(${categoriesCount.document})`
				: zeroResult}
		</button>
		<button
			class="button button__cat {searchType === 'contact' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('contact');
			}}
			disabled={categoriesCount.contact > 0 ? false : true}
		>
			{$_('category_persons')}
			{categoriesCount.contact > 0
				? `(${categoriesCount.contact})`
				: zeroResult}
		</button>
		<button
			class="button button__cat {searchType === 'general' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('general');
			}}
			disabled={categoriesCount.general > 0 ? false : true}
		>
			{$_('category_general')}
			{categoriesCount.general > 0
				? `(${categoriesCount.general})`
				: zeroResult}
		</button>
		{#if mq === false}
			<button class="button button__cat ref">&nbsp;&nbsp;</button>
		{/if}
	</div>
{/if}
