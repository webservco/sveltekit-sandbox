import 'unplugin-icons/types/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}

/**
 * Database error interface
 */
interface DatabaseError {
  code: string | null;
  errno: string | null;
  fatal: boolean | null;
  message: string;
  sql: string | null;
  sqlMessage: string | null;
  sqlState: string | null;
}

/**
 * Notes section.
 *
 * [SvelteKit 1.0 and TypeScript Course - Build A Type-Safe SvelteKit 1.0 App](https://www.youtube.com/watch?v=4soqks5zBLI)
 */
interface NoteInput {
  title: string;
  language: string;
  description: string;
}
interface Note extends NoteInput {
  favorite: boolean;
}

/**
 * Todo section
 */
interface TodoItemInput {
  description: string;
}
interface TodoItem extends TodoItemInput {
  id: string;
  complete: boolean;
}
