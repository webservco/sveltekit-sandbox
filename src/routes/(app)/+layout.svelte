<!--
Root layout
https://kit.svelte.dev/docs/routing#layout
https://kit.svelte.dev/docs/advanced-routing#advanced-layouts
-->
<header>
	<nav>
		H
		<a href="/">Home</a>
		<a href="/items">Items</a>
		<a href="/visit_counter">Visit counter</a>
		<a href="/about">About</a>
	</nav>
</header>

<h1>Hoard-R</h1>

<!-- +page.svelte is rendered in this <slot> -->
<slot />
