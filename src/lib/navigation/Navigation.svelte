<script lang="ts">
  import { getDrawerStore } from '@skeletonlabs/skeleton';

  const drawerStore = getDrawerStore();

  function drawerClose(): void {
    drawerStore.close();
  }
</script>

<nav class="list-nav p-4">
  <ul>

    <!-- (app) -->
    <li><a href="/" on:click={drawerClose}>Home</a></li>

    <li><a href="/visitCounter" on:click={drawerClose}>Visit counter</a></li>

    <li><a href="/about" on:click={drawerClose}>About</a></li>

    <!-- (notes) YT tutorial -->
    <li><a href="/notes" on:click={drawerClose}>Notes</a></li>

    <!-- (todo) SvelteKit tutorial -->
    <li><a href="/todo" on:click={drawerClose}>TODO</a></li>

    <!-- (h) Hoard-R -->
    <li><a href="/items" on:click={drawerClose}>Items</a></li>


  </ul>
</nav>
