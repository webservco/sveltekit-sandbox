<!--
Item list page.

https://learn.svelte.dev/tutorial/page-data
-->
<script>
  export let data;
</script>

<h2>Items</h2>

<ul>
  {#each data.summaries as { id, name }}
    <li><a href="/items/{id}.html">{name}</a></li>
  {/each}
</ul>
