<!--
    TODO list functionality, using in memory database.render
    https://learn.svelte.dev/tutorial/the-form-element
	https://learn.svelte.dev/tutorial/named-form-actions
-->
<script lang="ts">
  export let data;
</script>

<h2>TODO</h2>

<p>userId: {data.userId}</p>

<form method="POST" action="?/create">
  <label>
    Add todo:
    <input name="description" autocomplete="off" />
  </label>
</form>

<hr>

<div class="centered">
	<h3>Todo list</h3>

	<ul class="todos">
		{#each data.items as item (item.id)}
			<li>
				<form method="POST" action="?/delete">
					<input type="hidden" name="itemId" value="{item.id}" />
					<span>{item.description}</span>
					<button class="btn btn-icon" aria-label="Complete">
						[delete]
					</button>
				</form>
			</li>
		{/each}
	</ul>
</div>
