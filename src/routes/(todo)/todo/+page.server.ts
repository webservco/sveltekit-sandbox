import { fail } from '@sveltejs/kit';
import * as todoDatabase from '$lib/todo/todoDatabase';
import type { Cookies } from '@sveltejs/kit';

const userIdCookieName = 'userId';

function getUserId(cookies: Cookies): string {
  let userId = cookies.get(userIdCookieName);
  if (!userId) {
    userId = todoDatabase.generateId();
  }

  return userId;
}

export function load({ cookies }) {
  const userId = getUserId(cookies);

  cookies.set(userIdCookieName, userId, { path: '/' });

  return {
    userId: userId,
    items: todoDatabase.getItems(userId) ?? []
  };
}

export const actions = {
  create: async ({ cookies, request }) => {
    const formData = await request.formData();
    /**
     * Seems "FormDataEntryValue" can be: File | string | null.
     * Since we know what it should be, cast it as string.
     */
    const description = formData.get('description') as string;

    try {
      todoDatabase.addItem(description, getUserId(cookies));
    } catch (error) {
      return fail(422, {
        // Seems these will be available in the page as "form" properties.
        description: formData.get('description'),
        error: error instanceof Error ? error.message : error
      });
    }
  },

  delete: async ({ cookies, request }) => {
    const formData = await request.formData();
    const itemId = formData.get('itemId') as string;
    if (itemId !== '') {
      todoDatabase.deleteItem(itemId, getUserId(cookies));
    }
  }
};
