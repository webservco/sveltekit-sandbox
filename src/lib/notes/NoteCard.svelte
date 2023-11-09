<script lang="ts">
    import { CodeBlock } from "@skeletonlabs/skeleton";
    import { deleteNote, toggleFavorite } from "../../routes/(app)/notes/NoteStore";

    export let index: number;

    export let note: Note = {
        title: '',
        option: 0,
        description: '',
        favorite: false,
    };
</script>

<div class="card">
    <header class="card-header">
        {note.title}
        <div class="float-right">
            <button type="button" class="btn btn-sm variant-filled-secondary"
                on:click={() => toggleFavorite(index)}>
                { note.favorite ? 'Unfavorite' : 'Favorite' }
            </button>
            <button type="button" class="btn btn-sm variant-filled-error"
                on:click={() => deleteNote(index)}>
                x
            </button>
        </div>
    </header>
    <section class="p-4">
        <CodeBlock language={"HTML"} code={note.description} />
    </section>
</div>
