<script>
  import { _ } from 'svelte-i18n';

  export let searchTerm;
  export let searchTermSpellCheck;

</script>

<div class="widg__searchbar_autocomplete">
  <p>{$_('search_autocomplete_warning')} <b>{searchTerm}</b></p>
  <span>{$_('search_autocomlete_warning_2')} <b>"{searchTermSpellCheck}"</b></span>
</div>