<script lang="ts">
    import { getDrawerStore } from "@skeletonlabs/skeleton";

const drawerStore = getDrawerStore();

function drawerClose(): void {
     drawerStore.close();
}
</script>

<nav class="list-nav p-4">
    <ul>
        <li><a href="/" on:click={drawerClose}>Home</a></li>

        <li><a href="/items" on:click={drawerClose}>Items</a></li>
		<li><a href="/visitCounter" on:click={drawerClose}>Visit counter</a>
        <li><a href="/about" on:click={drawerClose}>About</a></li>

        <li><a href="/notes" on:click={drawerClose}>Notes</a></li>
    </ul>
</nav>
