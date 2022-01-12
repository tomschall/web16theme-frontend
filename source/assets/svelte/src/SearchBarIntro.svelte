<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import SvelteMarkdown from 'svelte-markdown';

	export let lang: string;
	const source: string = $_('introtext');
</script>

<div class="widg_searchbar-bar__intro" transition:fade={{ duration: 500 }}>
	<SvelteMarkdown {source} />
	<a href="https://www.fhnw.ch/{lang}/search_edu">{$_('introtext_studies')}</a>
	<a href="https://www.fhnw.ch/{lang}/search_filter"
		>{$_('introtext_continuing_educations')}</a
	>
	<a href="https://www.fhnw.ch/{lang}/search_profiles"
		>{$_('introtext_person')}</a
	>
	<a href="https://www.fhnw.ch/{lang}/about-fhnw/events"
		>{$_('introtext_events')}</a
	>
	<a href="https://www.fhnw.ch/{lang}/media-corner/newsroom/news"
		>{$_('introtext_news')}</a
	>
</div>
