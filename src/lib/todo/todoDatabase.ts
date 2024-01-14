/**
 * In memory todo database (1).
 *
 * https://learn.svelte.dev/tutorial/the-form-element
 */

import * as userLib from '$lib/todo/userLib';

const database = new Map();

export function addItem(description: string, userId: string) {
  if (description === '') {
    throw new Error('Missing or invalid description.');
  }

  const items = getItems(userId);

  if (items.find((item: TodoItem) => item.description === description)) {
    throw new Error('Item already exists.');
  }

  items.push({
    id: userLib.generateId(),
    description: description,
    complete: false,
  });
}

export function deleteItem(itemId: string, userId: string) {
  const items = getItems(userId);
  const itemIndex = items.findIndex((item: { id: string }) => item.id === itemId);

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
  }
}

export function getItems(userId: string) {
  if (!database.get(userId)) {
    database.set(userId, [
      {
        id: userLib.generateId(),
        description: 'Make a list',
        complete: false,
      },
    ]);
  }

  return database.get(userId);
}
