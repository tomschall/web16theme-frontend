<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { get } from '../../lib/api';

	export let query: string;
	export let searchType: string;
	export let handleInput: () => void;
	export let hostname: string;

	let searchProposals: any[] = [];
	let autocompleteTerm: string = '';

	$: {
		autocompleteTerm = query.trim();

		if (autocompleteTerm.length) {
			const endpoint =
				window.location.hostname === 'localhost'
					? // @ts-ignore
					  API_PROPOSALS + `?term=${autocompleteTerm}`
					: `https://${hostname}/autocomplete/?term=${autocompleteTerm}`;

			get(endpoint).then((data) => {
				searchProposals = data.suggestions;
			});
		}
	}

	const handleClick = (value: string) => {
		searchType = 'all';
		query = value;
		handleInput();
	};
</script>

{#if searchProposals.length}
	<div class="widg_search_proposals">
		<div class="widg_searchbar-bar__title">
			<p>{$_('search_proposal_title')}</p>
		</div>
		<ul class="not-default">
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
