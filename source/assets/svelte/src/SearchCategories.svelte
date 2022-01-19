<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import type { CategoriesCount } from './definitions/Categories';

	export let triggerCategorySearch = () => {};
	export let unobserve: any;
	export let searchType: string;
	export let categoriesCount: CategoriesCount;
	export let template: string;
	export let xScroll: number;

	let categoryLastElementNotVisible: boolean = true;
	let mq = window.estatico.mq.query({ from: 'small' }); // Estatico
	let zeroResult: string = '(0)';
	let categoryBox;

	const parseScroll = () => {
		xScroll = categoryBox.scrollLeft;
		let scrollBox = document.querySelector('.button.button__cat.ref');
		let rect = scrollBox.getBoundingClientRect();
		rect.right <=
		(window.innerWidth - 15 || document.documentElement.clientWidth - 15)
			? (categoryLastElementNotVisible = false)
			: (categoryLastElementNotVisible = true);
	};

	const handleCategorySearch = (type: string) => {
		searchType = type;
		if (template == 'searchpage') unobserve();
		triggerCategorySearch();
	};
</script>

{#if categoriesCount}
	<div
		class="widg_searchbar-bar__categories {xScroll >= 1
			? 'gradient_prev'
			: ''} {categoryLastElementNotVisible === true ? 'gradient_next' : ''}"
		data-searchbar="cat"
		style="display: flex;"
		transition:fade={{ duration: 0 }}
		bind:this={categoryBox}
		on:scroll={parseScroll}
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
			{$_('category_studys_plural')}
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
			{$_('category_education_plural')}
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
			{$_('category_events_plural')}
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
			{$_('category_documents_plural')}
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
			{$_('category_persons_plural')}
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
