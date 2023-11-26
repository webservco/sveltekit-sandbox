<script lang="ts">
  import NoteCard from '$lib/notes/NoteCard.svelte';
  import NoteForm from '$lib/notes/NoteForm.svelte';
  import { noteStore, addNote } from '$lib/notes/NoteStore';
  import type { NoteInput } from '../../../app';

  // Not needed when using local storage
  //import type { PageServerData } from './$types';
  //export let data: PageServerData;

  // Not needed when using local storage
  //noteStore.set(data.notes);

  // Default data to use in the form
  let noteIndex: number;

  const formData: NoteInput = {
    title: '',
    language: 'Plaintext',
    description: '',
  };
</script>

<h1>Notes <span class="badge variant-ghost-primary">localStorage</span></h1>

{#each $noteStore as note, index}
  <NoteCard {note} {index} />
{/each}

<hr />

<h3>Add note</h3>

<NoteForm {noteIndex} {formData} />
