<!--
    TODO list functionality, using in memory database.render
    https://learn.svelte.dev/tutorial/the-form-element
-->
<script>
  export let data;
</script>

<h2>TODO</h2>

<p>userId: {data.userId}</p>

<form method="POST">
  <label>
    Add todo:
    <input name="description" autocomplete="off" />
  </label>
</form>

<hr>

<div class="centered">
	<h2>Todos</h2>

	<ul class="todos">
		{#each data.items as item (item.id)}
			<li>
				{item.description}
			</li>
		{/each}
	</ul>
</div>
