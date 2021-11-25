<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let query: string;
	export let handleInput: () => void;

	let searchProposals: any[] = [];
	let autocompleteTerm: string = '';

	$: {
		autocompleteTerm = query.trim();

		if (autocompleteTerm.length) {
			const autocompleteEndpoint = `https://www.dev.fhnw.ch/de/autocomplete?term=${autocompleteTerm}`;

			fetch(autocompleteEndpoint)
				.then((response) => {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response.json();
				})
				.then((data) => {
					if (data.suggestions.length) {
						searchProposals = data.suggestions;
					}
				})
				.catch(() => {
					console.log('An error occured!');
				});
		}
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
		{#each searchProposals as searchProposal, index (index)}
			{#if index <= 3}
				<li on:click={() => handleClick(searchProposal.value)}>
					{searchProposal.value}
				</li>
			{/if}
		{/each}
	</ul>
</div>

<style>
	li {
		cursor: pointer;
	}
</style>
