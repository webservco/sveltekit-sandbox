<script lang="ts">
  import NoteCard from '$lib/notes/NoteCard.svelte';
  import { noteStore, addNote } from '$lib/notes/NoteStore';
  import type { PageServerData } from './$types';

  export let data: PageServerData;

  let formData: NoteInput = {
    title: '',
    option: 1,
    description: ''
  };

  noteStore.set(data.notes);
</script>

<h3>Note</h3>

<div class="card p-4 w-full text-token space-y-4">
  <label class="label">
    <span>Title</span>
    <input class="input" type="text" placeholder="title.." bind:value={formData.title} />
  </label>

  <label class="label">
    <span>Option</span>
    <select class="select" bind:value={formData.option}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </label>

  <label class="label">
    <span>Description</span>
    <textarea
      class="textarea"
      rows="4"
      placeholder="description.."
      bind:value={formData.description}
    />
  </label>

  <button
    type="button"
    class="btn btn-sm variant-filled-primary"
    on:click={() => addNote(formData)}
  >
    Add
  </button>
</div>

<hr />

<h3>Notes</h3>

{#each $noteStore as note, index}
  <NoteCard {note} {index} />
{/each}
