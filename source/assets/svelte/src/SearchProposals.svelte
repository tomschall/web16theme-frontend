<script>
	import { _ } from 'svelte-i18n';

	export let query;
	export let handleInput;

	let searchProposals = [];

	let autocompleteTerm = '';

	$: {
		autocompleteTerm = query.trim();

		const autocompleteEndpoint = `https://www.dev.fhnw.ch/de/autocomplete?term=${autocompleteTerm}`;

		fetch(autocompleteEndpoint)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then((data) => {
				console.log('data', data);
				if (data.suggestions.length) {
					searchProposals = data.suggestions;
				}
			})
			.catch(() => {
				console.log('An error occured!');
			})
			.finally(() => {});
	}

	const handleClick = (value) => {
		query = value;
		handleInput();
	};
</script>

<div class="widg_search_proposals">
	<div class="widg_searchbar-bar__title">
		<p>{$_('search_proposal_title')}</p>
	</div>
	<ul>
		{#each searchProposals as searchProposal}
			<li on:click={() => handleClick(searchProposal.value)}>
				{searchProposal.value}
			</li>
		{/each}
	</ul>
</div>
