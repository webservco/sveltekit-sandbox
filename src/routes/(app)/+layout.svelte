<!--
Root layout
https://kit.svelte.dev/docs/routing#layout
https://kit.svelte.dev/docs/advanced-routing#advanced-layouts
-->
<script>
	import { appVersion } from '$lib/appVersion';
</script>

<header>
	<nav>
		H
		<a href="/">Home</a>
		<a href="/items">Items</a>
		<a href="/visitCounter">Visit counter</a>
		<a href="/about">About</a>
	</nav>
</header>

<h1>Hoard-R</h1>

<!-- +page.svelte is rendered in this <slot> -->
<slot />

<footer>
	<hr />
	<small>v{appVersion}</small>
</footer>
