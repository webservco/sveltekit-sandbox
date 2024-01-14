/**
 * In memory todo database (2).
 *
 * Uses different approach as (1), and has more functionality.
 *
 * https://learn.svelte.dev/tutorial/post-handlers
 */

import * as userLib from '$lib/todo/userLib';

const database = new Map();

export function addItem(todoItemInput: TodoItemInput, userId: string): string {
  if (!database.has(userId)) {
    database.set(userId, new Map());
  }

  // Here we should use `getItems`, however it has strange return ("Array.from"..)
  //const items = database.get(userId);
  const items = getItems(userId);

  const itemId = userLib.generateId();

  items.set(itemId, {
    id: itemId,
    complete: false,
    description: todoItemInput.description,
  } satisfies TodoItem);

  return itemId;
}

export function deleteItem(itemId: string, userId: string) {
  // Here we should use `getItems`, however it has strange return ("Array.from"..)
  //const items = database.get(userId);
  const items = getItems(userId);

  items.delete(itemId);
}

export function getItems(userId: string) {
  if (!database.has(userId)) {
    addItem({ description: 'Blank line' } satisfies TodoItemInput, userId);
  }
  //return Array.from(database.get(userId).values());
  return database.get(userId);
}

export function toggleItemComplete(complete: boolean, itemId: string, userId: string) {
  // Here we should use `getItems`, however it has strange return ("Array.from"..)
  //const items = database.get(userId);
  const items = getItems(userId);

  items.get(itemId).complete = complete;
}
