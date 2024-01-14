<script lang="ts">
  import { CodeBlock } from '@skeletonlabs/skeleton';
  import { deleteNote, toggleFavorite } from './NoteStore';

  // https://icones.js.org/collection/heroicons
  import IconFavYes from '~icons/heroicons/hand-thumb-up-solid';
  import IconFavNo from '~icons/heroicons/hand-thumb-up';
  import IconEdit from '~icons/heroicons/pencil';
  import IconTrash from '~icons/heroicons/trash';

  // Despite being global, needed ot avoid linter "not defined" error
  import type Note from '$lib/types/ambient';

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
      <a class="btn btn-sm variant-ghost-primary" href="/notes/{index}">
        <IconEdit />
      </a>
      <button
        type="button"
        class="btn btn-sm variant-ghost-secondary"
        on:click={() => toggleFavorite(index)}
      >
        {#if note.favorite}
          <IconFavYes />
        {:else}
          <IconFavNo />
        {/if}
      </button>
      <button
        type="button"
        class="btn btn-sm variant-ghost-error"
        on:click={() => deleteNote(index)}
      >
        <IconTrash />
      </button>
    </div>
  </header>
  <section class="p-4">
    <CodeBlock language={note.language} code={note.description} />
  </section>
</div>
