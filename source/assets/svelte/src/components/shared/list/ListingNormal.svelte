<script lang="ts">
	import type { Item } from '../../../definitions/Item';
	import { _ } from 'svelte-i18n';
	import SvelteMarkdown from 'svelte-markdown/src/SvelteMarkdown.svelte';
	import Paragraph from '../Paragraph.svelte';
	import Select from 'svelte-select/src/Select.svelte';

	export let item: Item;
	export let searchResultsHighlighting: any[];

	let maxLettersInDescription = 180;
	let maxLettersInBreadCrumbItem = 40;
	let totalBreadCrumbItems: number = 0;
	let tooltip = '';
	let totalLettersInBreadCrumb: number = 0;
	let mq = window.estatico.mq.query({ from: 'small' }); // Estatico media query

	let testvalues = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'pizza', label: 'Pizza' },
		{ value: 'cake', label: 'Cake' },
		{ value: 'chips', label: 'Chips' },
		{ value: 'ice-cream', label: 'Ice Cream' },
	];

	let selectedValue = null;

	// remove own title from title_parents because it should not be in the breadcrumbs.
	if (item && item.title_parents) {
		item.title_parents.pop();
	}

	$: {
		if (item && item.title_parents) {
			totalBreadCrumbItems = item.title_parents.length;
			totalLettersInBreadCrumb = item.title_parents.join().length;
			tooltip = item.title_parents.slice(3).join(' › ');
		}
	}

	/**
	 * Cannot generate summary
	 * @param {string} str - The string to shorten
	 * @param {string} trimStyle - 'soft' | 'hard'
	 * @returns The shortened breadcrumb item.
	 */
	const shortenBreadCrumbItem = (str: string, trimStyle: string): string => {
		console.log('shortenBreadCrumbItem', str, trimStyle);
		switch (trimStyle) {
			case 'soft':
				return str.length === maxLettersInBreadCrumbItem + 1
					? str
					: str.substring(0, maxLettersInBreadCrumbItem) + '...';
			case 'hard':
				return str.length === maxLettersInBreadCrumbItem + 1
					? str
					: str.substring(0, maxLettersInBreadCrumbItem - 6) + '...';
			default:
				break;
		}
	};

	const shortenDescription = (
		highlighted_description: string,
		long_description: string
	) => {
		// for the calculations the highlight-syntax (**) is problematic so we remove it.
		let cleaned_description = highlighted_description.replaceAll('**', '');
		let shortened_description = highlighted_description;

		// check if we have to add ... to the start because there is more text before the highlighting.
		if (!long_description.startsWith(cleaned_description)) {
			shortened_description = `...${highlighted_description}`;
		}

		// check if we have to add ... to the end because theres more text after the highlighting.
		if (!long_description.endsWith(cleaned_description)) {
			shortened_description = `${shortened_description.substring(
				0,
				maxLettersInDescription - 3
			)}...`;
		}

		// check if we have to add ... to the end because description is to long.
		if (shortened_description.length > maxLettersInDescription) {
			shortened_description = `${shortened_description.substring(
				0,
				maxLettersInDescription - 3
			)}...`;
		}

		return shortened_description;
	};

	const translateType = (param: string) => {
		switch (param) {
			case 'general':
				return $_('category_general');
			case 'studies':
				return $_('category_studys');
			case 'continuing_education':
				return $_('category_education');
			case 'event':
				return $_('category_events');
			case 'news':
				return $_('category_news');
			case 'document':
				return $_('category_documents');
			case 'contact':
				return $_('category_persons');
			default:
				return 'to be translated';
		}
	};
</script>

<li class="search__result-normal search__result--item">
	<a href={item['@id']} title={item.Title}>
		<div class="result__top">
			<div class="breadcrumbs">
				{#if item.title_parents && mq === true}
					{#each item.title_parents as item, index (index)}
						{#if index + 1 === 1 && item.length <= maxLettersInBreadCrumbItem}
							<span
								class={index + 1 === totalBreadCrumbItems ? 'last--item' : ''}
							>
								{item}</span
							>
						{:else if index + 1 <= 3}
							{#if item.length <= maxLettersInBreadCrumbItem}
								<span
									class={index + 1 === totalBreadCrumbItems ? 'last--item' : ''}
								>
									{item}</span
								>
							{:else}
								<div class="listing__tooltip" data-tooltip={item}>
									<span
										class={index + 1 === totalBreadCrumbItems
											? 'last--item'
											: ''}
									>
										{totalBreadCrumbItems > 5
											? shortenBreadCrumbItem(item, 'hard')
											: shortenBreadCrumbItem(item, 'soft')}</span
									>
								</div>
							{/if}
						{:else if index + 1 === 4}
							<div class="listing__tooltip" data-tooltip={tooltip}>
								<span class={'last--item'}> ...</span>
							</div>
						{/if}
					{/each}
				{:else}
					{#each item.title_parents as item, index (index)}
						<span class={index + 1 === totalBreadCrumbItems ? 'last--item' : ''}
							>{item}</span
						>
					{/each}
				{/if}
			</div>
			<div class="result__type">
				<span class="button">{translateType(item.search_type)}</span>
			</div>
		</div>
		<span class="title">
			<SvelteMarkdown
				source={searchResultsHighlighting[item.UID].Title
					? searchResultsHighlighting[item.UID]?.Title[0]
					: item.Title}
				renderers={{
					paragraph: Paragraph,
				}}
			/>
		</span>
		{#if item.description.length}
			<span class="description">
				<SvelteMarkdown
					source={shortenDescription(
						searchResultsHighlighting[item.UID].Description
							? searchResultsHighlighting[item.UID].Description[0]
							: item.Description,
						item.Description
					)}
					renderers={{
						paragraph: Paragraph,
					}}
				/>
			</span>
		{/if}
		{#if item.news_date && item.search_type === 'news'}
			<span class="additional_desc"
				>{item.school !== 'null' ? item.school : false} | {item.news_date}</span
			>
		{/if}
		{#if item.start_date && item.search_type === 'event'}
			<span class="additional_desc"
				>{item.start_date} - {item.end_date} | {item.location_short}</span
			>
		{/if}
		{#if item.institute && item.search_type === 'contact'}
			<span class="additional_desc">{item.institute}</span>
		{/if}
		{#if item.filesize}
			<span class="additional_desc">{item.filetype} | {item.filesize}</span>
		{/if}
	</a>
</li>

<Select items={testvalues} bind:selectedValue />

<style>
	/*This would all go into the global.css file*/
	[data-tooltip] {
		position: relative;
		z-index: 2000;
		display: block;
		padding-left: 20px;
		cursor: pointer;
	}

	[data-tooltip]:before,
	[data-tooltip]:after {
		visibility: hidden;
		opacity: 0;
		pointer-events: none;
		transition: 0.2s ease-out;
		transform: translate(-50%, 5px);
	}

	[data-tooltip]:before {
		position: absolute;
		bottom: 100%;
		left: 50%;
		margin-bottom: 5px;
		padding: 7px;
		width: 100%;
		min-width: 170px;
		max-width: 250px;
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		border-radius: 3px;
		background-color: #000;
		background-color: hsla(0, 0%, 20%, 0.9);
		color: #fff;
		content: attr(data-tooltip);
		text-align: center;
		font-size: 14px;
		line-height: 1.2;
		transition: 0.2s ease-out;
	}

	[data-tooltip]:after {
		position: absolute;
		bottom: 100%;
		left: 50%;
		width: 0;
		border-top: 5px solid #000;
		border-top: 5px solid hsla(0, 0%, 20%, 0.9);
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
		content: ' ';
		font-size: 0;
		line-height: 0;
	}

	[data-tooltip]:hover:before,
	[data-tooltip]:hover:after {
		visibility: visible;
		opacity: 1;
		transform: translate(-50%, 0);
	}
	[data-tooltip='false']:hover:before,
	[data-tooltip='false']:hover:after {
		visibility: hidden;
		opacity: 0;
	}
</style>
