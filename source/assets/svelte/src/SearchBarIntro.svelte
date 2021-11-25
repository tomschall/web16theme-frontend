<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import SvelteMarkdown from 'svelte-markdown';

	const source: string = $_('introtext');
</script>

<div class="widg_searchbar-bar__intro" transition:fade={{ duration: 500 }}>
	<SvelteMarkdown {source} />
	<a href="https://www.fhnw.ch/en/search_edu">Search degree programmes</a>
	<a href="https://www.fhnw.ch/en/search_filter">Search continuing education</a>
	<a href="https://www.fhnw.ch/en/search_profiles">Search people</a>
	<a href="https://www.fhnw.ch/en/about-fhnw/events">Search events</a>
	<a href="https://www.fhnw.ch/en/media-corner/newsroom/news">Search news</a>
</div>
