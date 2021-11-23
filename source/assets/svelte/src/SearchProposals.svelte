<script>
	import { _ } from 'svelte-i18n';
	import SvelteMarkdown from 'svelte-markdown';

	let searchProposals = [
		'Lorem **ipsum**',
		'Lorem ipsum **dolor**',
		'Lorem ipsum dolor **sit**',
		'Lorem ipsum dolor sit **amet**',
	];

</script>

<div class="widg_search_proposals">
	<div class="widg_searchbar-bar__title">
		<p>{$_('search_proposal_title')}</p>
	</div>
	<ul>
		{#each searchProposals as source (source)}
			<li>
				<a href="#"><SvelteMarkdown {source} /></a
				>
			</li>
		{/each}
	</ul>
</div>
