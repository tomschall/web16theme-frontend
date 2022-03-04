<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import type { CategoriesCount } from '../../common/category';

	export let triggerCategorySearch = () => {};
	export let unobserve: any;
	export let searchType: string;
	export let categoriesCount: CategoriesCount;
	export let categoriesCountClone: CategoriesCount;
	export let template: string;
	export let xScroll: number;

	let categoryLastElementNotVisible: boolean = true;
	let mq = window.estatico.mq.query({ from: 'small' }); // Estatico
	let zeroResult: string = '(0)';
	let categoryBox: any;

	/**
	 * It takes the scroll position of the category box and checks if the last element is visible.
	 * @returns None
	 */
	const parseScroll = () => {
		xScroll = categoryBox.scrollLeft;
		let scrollBox: Element = document.querySelector('.button.button__cat.ref');
		let rect: DOMRect = scrollBox.getBoundingClientRect();
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
			{$_('category_all')} ({categoriesCount.all === 0
				? categoriesCountClone.all
				: categoriesCount.all})
		</button>

		<button
			class="button button__cat {searchType && searchType === 'studies'
				? 'active'
				: ''}"
			on:click={() => {
				handleCategorySearch('studies');
			}}
			disabled={categoriesCountClone.studies === 0 &&
			categoriesCount.studies === 0
				? true
				: false}
		>
			{$_('category_studys_plural')}
			{categoriesCount.studies > 0
				? `(${categoriesCount.studies})`
				: `(${categoriesCountClone.studies})`}
		</button>

		<button
			class="button button__cat {searchType &&
			searchType === 'continuing_education'
				? 'active'
				: ''}"
			on:click={() => {
				handleCategorySearch('continuing_education');
			}}
			disabled={categoriesCountClone.continuing_education === 0 &&
			categoriesCount.continuing_education === 0
				? true
				: false}
		>
			{$_('category_education_plural')}
			{categoriesCount.continuing_education > 0
				? `(${categoriesCount.continuing_education})`
				: `(${categoriesCountClone.continuing_education})`}
		</button>

		<button
			class="button button__cat {searchType === 'event' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('event');
			}}
			disabled={categoriesCountClone.event === 0 && categoriesCount.event === 0
				? true
				: false}
		>
			{$_('category_events_plural')}
			{categoriesCount.event > 0
				? `(${categoriesCount.event})`
				: `(${categoriesCountClone.event})`}
		</button>

		<button
			class="button button__cat {searchType === 'news' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('news');
			}}
			disabled={categoriesCountClone.news === 0 && categoriesCount.news === 0
				? true
				: false}
		>
			{$_('category_news')}
			{categoriesCount.news > 0
				? `(${categoriesCount.news})`
				: `(${categoriesCountClone.news})`}
		</button>

		<button
			class="button button__cat {searchType === 'document' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('document');
			}}
			disabled={categoriesCountClone.document === 0 &&
			categoriesCount.document === 0
				? true
				: false}
		>
			{$_('category_documents_plural')}
			{categoriesCount.document > 0
				? `(${categoriesCount.document})`
				: `(${categoriesCountClone.document})`}
		</button>

		<button
			class="button button__cat {searchType === 'contact' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('contact');
			}}
			disabled={categoriesCountClone.contact === 0 &&
			categoriesCount.contact === 0
				? true
				: false}
		>
			{$_('category_persons_plural')}
			{categoriesCount.contact > 0
				? `(${categoriesCount.contact})`
				: `(${categoriesCountClone.contact})`}
		</button>

		<button
			class="button button__cat {searchType === 'general' ? 'active' : ''}"
			on:click={() => {
				handleCategorySearch('general');
			}}
			disabled={categoriesCountClone.general === 0 &&
			categoriesCount.general === 0
				? true
				: false}
		>
			{$_('category_general')}
			{categoriesCount.general > 0
				? `(${categoriesCount.general})`
				: `(${categoriesCountClone.general})`}
		</button>

		{#if mq === false}
			<button class="button button__cat ref">&nbsp;&nbsp;</button>
		{/if}
	</div>
{/if}
