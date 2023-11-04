<!--
Root layout
https://kit.svelte.dev/docs/routing#layout
https://kit.svelte.dev/docs/advanced-routing#advanced-layouts
-->
<header>
  <nav>
    H
    <a href="/">home</a>
    <a href="/items">items</a>
    <a href="/about">about</a>
  </nav>
</header>

<h1>Hoard-R</h1>

<!-- +page.svelte is rendered in this <slot> -->
<slot />
