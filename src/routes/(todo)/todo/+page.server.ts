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
  default: async ({ cookies, request }) => {
    const formData = await request.formData();
    /**
     * Seems "FormDataEntryValue" can be: File | string | null.
     * Since we know what it should be, cast it as string.
     */
    const description = formData.get('description') as string;
    if (description !== '') {
      todoDatabase.addItem(getUserId(cookies), description);
    }
  }
};
