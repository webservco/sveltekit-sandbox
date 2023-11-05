<!--
Item details page.

https://learn.svelte.dev/tutorial/page-data
-->
<script>
	export let data;
</script>

<h1>{data.item?.itemName}</h1>

<div>{data.item?.itemDescription}</div>
