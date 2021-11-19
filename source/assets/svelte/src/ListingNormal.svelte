<script>
	export let item;

	/**
	 * BREADCRUMB EXAMPLE
	 */
	let breadCrumbsItems = {
		title_parents: [
			'Sandkasten',
			'Tests Adrian',
			'Allgemein',
			'Test FHNW-Event',
		],
	};
</script>

<li class="search__result-normal search__result--item">
	<div class="result__top">
		<div class="breadcrumbs">
			{#each breadCrumbsItems.title_parents as item (item)}
				<span>{item}</span>
			{/each}
		</div>
		<div class="result__type">
			<span class="button">{item['@type']}</span>
		</div>
	</div>
	<a href={item['@id']}>
		<span class="title">{item.Title}</span>
		<span class="description">{item.Description}</span>
	</a>
</li>