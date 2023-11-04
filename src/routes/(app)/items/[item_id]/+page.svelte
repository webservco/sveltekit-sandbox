<!--
Item details page.

https://learn.svelte.dev/tutorial/page-data
-->
<script>
	export let data;
</script>

<h1>{data.item?.item_name}</h1>

<div>{data.item?.item_description}</div>
