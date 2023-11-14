<!--
    TODO list functionality, using in memory database.render
    https://learn.svelte.dev/tutorial/the-form-element
	https://learn.svelte.dev/tutorial/named-form-actions
-->
<script lang="ts">
  // [Progressive enhancement](https://learn.svelte.dev/tutorial/progressive-enhancement)
  import { enhance } from '$app/forms';
  // Transitions
  import { fly, slide } from 'svelte/transition';
  import IconTrash from '~icons/heroicons/trash';

  export let data;

  // For accessing the form after submission (check errors)
  export let form;

</script>

<h2>TODO</h2>

<p>userId: {data.userId}</p>

<!-- Check form errors -->
{#if form?.error}
  <!-- https://www.skeleton.dev/elements/alerts -->
  <aside class="alert variant-filled-error">
    <div class="alert-message">
      <h3>Error</h3>
      <p>{form.error}</p>
    </div>
  </aside>
{/if}

<form method="POST" action="?/create" use:enhance>
  <label>
    Add todo:
    <input name="description" autocomplete="off" required value={form?.description ?? ''} />
  </label>
</form>

<hr />

<div class="centered">
  <h3>Todo list</h3>

  <ul class="todos">
    {#each data.items as item (item.id)}
      <li in:fly={{ y: 20 }} out:slide>
        <form method="POST" action="?/delete" use:enhance>
          <input type="hidden" name="itemId" value={item.id} />
          <span>{item.description}</span>
          <button class="btn btn-icon" aria-label="Complete">
            <IconTrash />
          </button>
        </form>
      </li>
    {/each}
  </ul>
</div>
