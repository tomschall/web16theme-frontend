<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import SvelteMarkdown from 'svelte-markdown';

	export let lang: string;
	const source: string = $_('introtext');
</script>

<div class="widg_searchbar-bar__intro" transition:fade={{ duration: 500 }}>
	<SvelteMarkdown {source} />
	<a href="https://www.fhnw.ch/{lang}{$_('introtext_studies_link')}"
		>{$_('introtext_studies')}</a
	>
	<a
		href="https://www.fhnw.ch/{lang}{$_(
			'introtext_continuing_educations_link'
		)}">{$_('introtext_continuing_educations')}</a
	>
	<a href="https://www.fhnw.ch/{lang}{$_('introtext_person_link')}"
		>{$_('introtext_person')}</a
	>
	<a href="https://www.fhnw.ch/{lang}{$_('introtext_events_link')}"
		>{$_('introtext_events')}</a
	>
	<a href="https://www.fhnw.ch/{lang}{$_('introtext_news_link')}"
		>{$_('introtext_news')}</a
	>
</div>
