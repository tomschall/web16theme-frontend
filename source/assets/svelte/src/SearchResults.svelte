<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Item } from './definitions/Item';
	import ListItem from './ListingNormal.svelte';
	import ListTeaser from './ListingTeaser.svelte';
	import LoadingIndicator from './LoadingIndicator.svelte';
	import ListingLinkList from './ListingLinkList.svelte';

	export let results: Item[];
	export let isLoading: boolean;
	export let searchResultsHighlighting: any[];
	export let template: string;
	export let searchTerm: string;
	export let searchType: string;
	export let lang: string;
	export let listingType: string;

	function IsSafari() {
		var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
		return is_safari;
	}
</script>

<!-- LISTING SEARCHPAGE, SEARCHBAR -->
{#if template === ('searchpage' || 'searchbar')}
	<ul class="not-default lorem">
		{#each results as result, index (index)}
			{#if index < 9 && template === 'searchbar'}
				<ListItem item={result} {searchResultsHighlighting} />
			{/if}

			{#if template === 'searchpage'}
				<ListItem item={result} {searchResultsHighlighting} />
			{/if}
		{/each}

		{#if results.length > 0 && template === 'searchbar'}
			<li>
				<a
					class="widg_searchbar__go-to-page not-default"
					href={`/${lang}/search_all?query=${searchTerm}&searchtype=${searchType}`}
					>{$_('search_all_results')}</a
				>
			</li>
			{#if IsSafari()}
				<li class="ios-space" />
			{/if}
		{/if}
	</ul>
{/if}

<!-- LISTING InContentSearch -->
{#if template === 'continuing_education'}
	{#if listingType === 'grid'}
		<div class="widg_teaser__wrapper">
			{#each results as result, index (index)}
				<ListTeaser item={result} />
			{/each}
		</div>
	{/if}
	{#if listingType === 'list'}
		<div class="widg_linklist">
			<ul class="not-default">
				{#each results as result, index (index)}
					<ListingLinkList item={result} />
				{/each}
			</ul>
		</div>
	{/if}
{/if}

<div class="loading-indicator">
	{#if isLoading}
		<LoadingIndicator />
	{/if}
</div>

<style>
	.loading-indicator {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 20px;
		padding-bottom: 10px;
		width: 100%;
	}

	.ios-space {
		height: 100px;
	}
</style>
