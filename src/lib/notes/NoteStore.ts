/*
Local storage database
From "SvelteKit Stores Using Local Storage With Skeleton UI (Persistent Store)"
Repo: https://github.com/coopercodes/SvelteKitLocalStorageStores

Notes from tutorial:
// contactStore is a writable which holds an array of contacts
// $contactStore
// contactStore is the writable object (subscribe, delete, change value)
// $contactStore is how you get the VALUE of your store
*/

import { get } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton'; // Back up data
import type { Writable } from 'svelte/store'; // Handle data
import type { Note, NoteInput } from '../../app';
import exp from 'constants';

/*
Volatile database (lost even on page reload).
From the SvelteKit+Typescript YT tutorial
import { writable } from 'svelte/store';
export const noteStore = writable<Note[]>([]);

Local storage database:
*/
export const noteStore: Writable<Note[]> = localStorageStore('noteStore', []);

export function addNote(input: NoteInput) {
  const existingNotes = get(noteStore);
  noteStore.update(() => {
    // Create a new store that has the new item at the top and then all the existing ones.
    return [
      // New item; "..." = expand properties; set the favorite flag;
      { ...input, favorite: false },
      // existing items; "..." = expand;
      ...existingNotes,
    ];
  });
}

export function deleteNote(index: number) {
  const existingNotes = get(noteStore);

  existingNotes.splice(index, 1);
  noteStore.update(() => {
    return existingNotes;
  });
}

export function retrieveNote(index: number): Note {
  const existingNotes = get(noteStore);

  const note = existingNotes.at(index);

  if (note === undefined) {
    throw new Error('Item not found');
  }

  return note;
}

export function setNoteAtIndex(index: number, input: NoteInput) {
  const existingNotes = get(noteStore);

  existingNotes[index] = { ...input, favorite: false };

  noteStore.update(() => {
    return existingNotes;
  });
}

export function toggleFavorite(index: number) {
  const existingNotes = get(noteStore);
  noteStore.update(() => {
    return existingNotes.map((note, noteIndex) => {
      if (noteIndex === index) {
        return { ...note, favorite: !note.favorite };
      }
      return note;
    });
  });
}
