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

  // Use local state; handle slow network.
  let creatingItem = false;
  let deletingItems: string[] = [];
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

<form
  method="POST"
  action="?/create"
  use:enhance={() => {
    creatingItem = true;

    return async ({ update }) => {
      await update();
      creatingItem = false;
    };
  }}
>
  <label>
    Add todo:
    <input
      name="description"
      autocomplete="off"
      required
      disabled={creatingItem}
      value={form?.description ?? ''}
    />
  </label>
</form>

{#if creatingItem}
  <aside class="alert variant-filled-surface">
    <div class="alert-message">
      <p>Creating item...</p>
    </div>
  </aside>
{/if}

<hr />

<div class="centered">
  <h3>Todo list</h3>

  <ul class="todos">
    {#each data.items.filter((item) => !deletingItems.includes(item.id)) as item (item.id)}
      <li in:fly={{ y: 20 }} out:slide>
        <form
          method="POST"
          action="?/delete"
          use:enhance={() => {
            deletingItems = [...deletingItems, item.id];
            return async ({ update }) => {
              await update();
              deletingItems = deletingItems.filter((id) => id !== item.id);
            };
          }}
        >
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
