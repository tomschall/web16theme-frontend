<script>
import { _ } from "svelte-i18n";


	export let item = [];

	let maxLettersInDescription = 175;
	let maxLettersInBreadCrumbItem = 23;
	let totalBreadCrumbItems = 0;
	let totalLettersInBreadCrumb = 0;

	$: {
		if (item && item.title_parents) {
			totalBreadCrumbItems = item.title_parents.length;
			totalLettersInBreadCrumb = item.title_parents.join().length;
		}
	}

	const shortenBreadCrumbItem = (string, trimStyle) => {
		switch (trimStyle) {
			case 'soft':
				//console.log(`%c soft: ${string}`, 'color: darkorange');
				return string.length <= 20 ? string : string.substring(0, 18) + '...';
			case 'medium':
				if (totalBreadCrumbItems <= 2) {
					//console.log(`%c medium: ${string}`, 'color: darkseagreen');
					return string.length < 50 ? string : string.substring(0, 45) + '...';
				} else if (totalBreadCrumbItems >= 2) {
					//console.log(`%c medium: ${string}`, 'color: darkseagreen');
					return string.length < 28 && totalBreadCrumbItems <= 4
						? string
						: string.substring(0, 26) + '...';
				}
			case 'hard':
				//console.log(`%c hard: ${string}`, 'color: deepskyblue');
				return string.length <= 14 ? string : string.substring(0, 14) + '...';
			default:
				break;
		}
	};

	const shortenDescription = (string) =>
		string.length <= maxLettersInDescription
			? string
			: string.substring(0, maxLettersInDescription) + '...';
</script>

<li class="search__result-normal search__result--item">
	<div class="result__top">
		<div class="breadcrumbs">
			{#if item.title_parents}
				{#each item.title_parents as item, index (index)}
					{#if index + 1 === 1 && item.length <= maxLettersInBreadCrumbItem}
						<span>{item}</span>
					{:else if index + 1 === 1}
						<div class="listing__tooltip" data-tooltip={item}>
							<span>{shortenBreadCrumbItem(item, 'soft')}</span>
						</div>
					{:else if index + 1 < 4 && totalBreadCrumbItems <= 5}
						<div class="listing__tooltip" data-tooltip={item}>
							<span>{shortenBreadCrumbItem(item, 'medium')}</span>
						</div>
					{:else if index + 1 < 5 && totalBreadCrumbItems > 5}
						<div class="listing__tooltip" data-tooltip={item}>
							<span>{shortenBreadCrumbItem(item, 'hard')}</span>
						</div>
					{:else if index + 1 > 7}
						<div class="listing__tooltip" data-tooltip={item}>
							<span>...</span>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
		<div class="result__type">
			<span class="button">{item.search_type}</span>
		</div>
	</div>
	<a href={item['@id']} title={item.Title}>
		<span class="title">{item.Title}</span>
		<span class="description">{shortenDescription(item.Description)}</span>
		{#if item.news_date && item.search_type === 'news'}
			<span class="additional_desc">{$_('searchresult_university')}: {item.school} {item.oes[0]} | {item.news_date}</span>
		{/if}
	</a>
</li>

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
