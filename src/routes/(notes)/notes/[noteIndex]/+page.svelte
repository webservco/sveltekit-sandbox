<script lang="ts">
  import { browser } from '$app/environment';
  import { error } from '@sveltejs/kit';
  import { retrieveNote } from '$lib/notes/NoteStore.js';
  import NoteForm from '$lib/notes/NoteForm.svelte';

  // Despite being global, needed ot avoid linter "not defined" error
  import type NoteInput from '$lib/types/ambient';

  export let data;

  const note = browser ? retrieveNote(data.noteIndex) : undefined;

  if (browser && note === undefined) {
    error(404);
  }

  // Using directly `data.noteIndex` in `<NoteForm>` give an error
  const noteIndex = data.noteIndex;

  // Note is not accepted despite extending NoteInput
  const formData: NoteInput = {
    title: note ? note.title : '',
    language: note ? note.language : '',
    description: note ? note.description : '',
  };
</script>

<h1>
  Edit note
  <span class="badge variant-ghost-primary">{data.noteIndex}</span>
</h1>

<NoteForm {noteIndex} {formData} />
