<script lang="ts">
  export let ordered
  export let start
</script>

{#if ordered}
  <ol {start}><slot /></ol>
{:else}
  <ul><slot /></ul>
{/if}
