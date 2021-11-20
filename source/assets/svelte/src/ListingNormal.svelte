<script>
	export let item;

	let trimBreadCrumbItemAfter = 2;
	let maxLettersInBreadcrumb = 110;
	let maxLettersInDescription = 175;

	/**
	 * BREADCRUMB EXAMPLE
	 */
	let breadCrumbsItems = {
		title_parents: [
			'Hochschulen',
			'Über die Pädagogische Hochschule – PH',
			'Medien und Öffentlichkeit',
			'Events der PH FHNW',
			'Archiv Tagungen IWB',
			'DGfE-Jahrestagung der Kommission Sportpädagogik: Narrat...',
		],
	};

	const shortenBreadCrumbItem = (string) =>
		string.length <= 12 ? string : string.substring(0, 23) + '...';

	const trimDescription = (string) =>
		string.length <= maxLettersInDescription
			? string
			: string.substring(0, maxLettersInDescription) + '...';
</script>

<li class="search__result-normal search__result--item">
	<div class="result__top">
		<div class="breadcrumbs">
			{#each breadCrumbsItems.title_parents as item, index (index)}
				{#if index + 1 === 1}
					<span>{item}</span>
				{:else if index + 1 >= 2 && index + 1 <= 3}
					<div class="listing__tooltip" data-tooltip={item}>
						<span>{shortenBreadCrumbItem(item)}</span>
					</div>
				{:else}
					<div class="listing__tooltip" data-tooltip={item}>
						<span>...</span>
					</div>
				{/if}
			{/each}
		</div>
		<div class="result__type">
			<span class="button">{item['@type']}</span>
		</div>
	</div>
	<a href={item['@id']}>
		<span class="title">{item.Title}</span>
		<span class="description">{trimDescription(item.Description)}</span>
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
