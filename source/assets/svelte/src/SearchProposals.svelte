<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let query: string;
	export let searchType: string;
	export let handleInput: () => void;

	let searchProposals: any[] = [];
	let autocompleteTerm: string = '';

	$: {
		autocompleteTerm = query.trim();

		if (autocompleteTerm.length) {
			const autocompleteEndpoint =
				window.location.hostname === 'localhost'
					? // @ts-ignore
					  API_PROPOSALS + `?term=${autocompleteTerm}`
					: `https://${window.location.hostname}/autocomplete/?term=${autocompleteTerm}`;

			fetch(autocompleteEndpoint)
				.then((response) => {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response.json();
				})
				.then((data) => {
					searchProposals = data.suggestions;
				})
				.catch(() => {
					console.log('An error occured!');
				});
		}
	}

	const handleClick = (value: string) => {
		searchType = '';
		query = value;
		handleInput();
	};
</script>

{#if searchProposals.length}
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
{/if}

<style>
	li {
		cursor: pointer;
	}
</style>
