<script>
  import { _ } from 'svelte-i18n';
  import SvelteMarkdown from 'svelte-markdown'

  const source = $_('search_introtext');

</script>

<div class="widg_searchbar-bar__intro">
  <p><SvelteMarkdown {source} /></p>
  <a href="https://www.fhnw.ch/en/search_edu">Search degree programmes</a>
  <a href="https://www.fhnw.ch/en/search_filter">Search continuing education</a>
  <a href="https://www.fhnw.ch/en/search_profiles">Search people</a>
  <a href="https://www.fhnw.ch/en/about-fhnw/events">Search events</a>
  <a href="https://www.fhnw.ch/en/media-corner/newsroom/news">Search news</a>
</div>