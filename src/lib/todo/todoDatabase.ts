/**
 * In memory todo database.
 *
 * https://learn.svelte.dev/tutorial/the-form-element
 */

const database = new Map();

export function addItem(description: string, userId: string) {
  const items = getItems(userId);

  items.push({
    id: generateId(),
    description: description,
    done: false
  });
}

export function deleteItem(itemId: string, userId: string) {
  const items = getItems(userId);
  const itemIndex = items.findIndex((item: { id: string }) => item.id === itemId);

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
  }
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function getItems(userId: string) {
  if (!database.get(userId)) {
    database.set(userId, [
      {
        id: generateId(),
        description: 'Make a list',
        done: false
      }
    ]);
  }

  return database.get(userId);
}
