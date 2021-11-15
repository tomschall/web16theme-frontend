<script>
  import ListItem from './ListingNormal.svelte';
  export let results;
</script>

<ul class="search-results">
  {#each results as result (result)}
    <ListItem item={result} />
  {/each}
</ul>
