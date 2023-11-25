<script lang="ts">
  import { CodeBlock } from '@skeletonlabs/skeleton';
  import { deleteNote, toggleFavorite } from './NoteStore';
  import type { Note } from '../../app';

  export let index: number;

  export let note: Note = {
    title: '',
    language: 'Plaintext',
    description: '',
    favorite: false,
  };
</script>

<div class="card">
  <header class="card-header">
    {note.title}
    <div class="float-right">
      <button
        type="button"
        class="btn btn-sm variant-filled-secondary"
        on:click={() => toggleFavorite(index)}
      >
        {note.favorite ? 'Unfavorite' : 'Favorite'}
      </button>
      <button
        type="button"
        class="btn btn-sm variant-filled-error"
        on:click={() => deleteNote(index)}
      >
        x
      </button>
    </div>
  </header>
  <section class="p-4">
    <CodeBlock language={note.language} code={note.description} />
  </section>
</div>
