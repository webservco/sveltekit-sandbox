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
  //import type { TodoItem } from '../../../app.js';

  export let data;

  // For accessing the form after submission (check errors)
  export let form;

  // Use local state; handle slow network.
  let creatingItem = false;
  let deletingItems: string[] = [];

  /**
   * Create item on input enter via API.
   *
   * Usage: `on:keydown={creatingItemOnKeydown}`
   * Status:
   * - seems to work (item is created) however page is not updated with the list of items.
   * - abandoned for the moment (use normal form and not in-plcee api call)
   *
  let creatingItemOnKeydown = async (e: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
    if (e.key === 'Enter') {
      // Prevent default action (form submit).
      e.preventDefault();

      // Get form value.
      const input = e.currentTarget;
      const description = input.value;

      // Create item via API call.
      const response = await fetch('/todo/api', {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Get itemId from response.
      const { itemId } = await response.json();

      // Update local list of items (map).
      data.items.set(itemId, {
        id: itemId,
        complete: false,
        description: description,
      } satisfies TodoItem);

      // Assign again items list. Without this, all works however data is not updated on the fly in the page
      data.items = data.items;

      // Clear form input.
      input.value = '';
    }
  };
  */

  /**
   * Delete item on click via API.
   *
   * Usage: `data-id={item.id} on:click={deleteItemOnClick}`
   *
  let deleteItemOnClick = async (e: MouseEvent & { currentTarget: HTMLInputElement }) => {
    // Prevent default action (form submit).
    e.preventDefault();

    // Get item id.
    const input = e.currentTarget;
    const itemId = input.getAttribute('data-id');
    if (itemId === null) {
      return false;
    }

    // Delete item.
    await fetch(`/todo/api/${itemId}`, {
      method: 'DELETE',
    });

    // Remove item from the list.
    data.items.delete(itemId);

    // Assign again items list. Without this, all works however data is not updated on the fly in the page
    data.items = data.items;
  };
  */

  /**
   * Mark item complete on checkbox change.
   *
   * Usage: `data-id={item.id} on:change={markCompleteOnChange}`
   *
   * https://stackoverflow.com/a/72340285/14583382
   */
  let markCompleteOnChange = async (e: Event & { currentTarget: HTMLInputElement }) => {
    // Get form value.
    const input = e.currentTarget;
    const itemId = input.getAttribute('data-id');
    if (itemId === null) {
      return false;
    }
    const complete = input.checked;

    // Save state via API call.
    await fetch(`todo/api/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ complete }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Nothing else to do.
  };
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

<!-- Add item -->
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
      class="input"
      type="text"
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
  <h3>Items list</h3>
  <ul class="todos">
    {#each [...data.items.values()] as item}
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
          <input
            class="checkbox"
            type="checkbox"
            checked={item.complete}
            data-id={item.id}
            on:change={markCompleteOnChange}
          />
          <span>{item.description}</span>
          {#if deletingItems.includes(item.id)}
            <span class="badge variant-filled-warning">deleting...</span>
          {:else}
            <button type="submit" class="btn btn-icon" aria-label="Delete">
              <IconTrash />
            </button>
          {/if}
        </form>
      </li>
    {/each}
  </ul>
</div>
