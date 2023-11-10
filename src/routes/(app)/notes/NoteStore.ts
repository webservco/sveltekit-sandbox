/*
Volatile database (lost even on page reload).
From the SvelteKit+Typescript YT tutorial
*/

import { writable, get } from "svelte/store";

export const noteStore = writable<Note[]>([]);

export function addNote(input: NoteInput) {
    let existingNotes = get(noteStore);
    noteStore.update(() => {
        // Create a new store that has the new item at the top and then all the existing ones.
        return [
            // New item; "..." = expand properties; set the favorite flag;
            { ...input, favorite: false },
            // existing items; "..." = expand;
            ...existingNotes
        ];
    });
}

export function deleteNote(index: number) {
    let existingNotes = get(noteStore);
    existingNotes.splice(index, 1);
    noteStore.update(() => {
        return existingNotes;
    });
}

export function toggleFavorite(index: number) {
    let existingNotes = get(noteStore);
    noteStore.update(() => {
        return existingNotes.map((note, noteIndex) => {
            if (noteIndex === index) {
                return { ...note, favorite: !note.favorite }
            }
            return note;
        });
    });
}
