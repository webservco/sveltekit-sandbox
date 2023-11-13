<!--
Layout for item details page.

https://learn.svelte.dev/tutorial/layout-data
-->
<script lang="ts">
  import { page } from '$app/stores';

  export let data;
</script>

<div class="layout">
  <main>
    <!-- +page.svelte is rendered in this <slot> -->
    <slot />
  </main>

  <aside>
    <h2>More items</h2>
    <ul>
      <!-- Data comes from parent `+layout.server.js` -->
      {#each data.summaries as { id, name }}
        <!--
                    `$page.params.itemId` is a string including the fake file extension
                    So for itemId 1, it will be "1.html".
                    Workaround to get the actual id: `parseInt`.
                -->
        {#if id !== parseInt($page.params.itemId)}
          <li>
            <a href="/items/{id}.html">{name}</a>
          </li>
        {/if}
      {/each}
    </ul>
  </aside>
</div>

<style>
  @media (min-width: 640px) {
    .layout {
      display: grid;
      gap: 2em;
      grid-template-columns: 1fr 16em;
    }
  }
</style>
