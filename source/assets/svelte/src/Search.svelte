<script>
  import { _ } from 'svelte-i18n';

  export let query;
  export let handleSubmit;
</script>

<div class="widg_searchbar-bar__search">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="widg_searchbar-bar__close" data-searchbar="close" />
    <label for="search" class="visuallyhidden">{$_('search_label')}</label>
    <input
      bind:value={query}
      type="text"
      name="searchbar_search"
      placeholder={$_('search_placeholder')}
      data-searchbar="input"
    />
  </form>
</div>
