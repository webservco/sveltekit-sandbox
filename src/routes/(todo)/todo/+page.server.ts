import { fail } from '@sveltejs/kit';
import * as todoDatabase from '$lib/todo/todoDatabase2';
import * as userLib from '$lib/todo/userLib';

export function load({ cookies }) {
  const userId = userLib.getUserId(cookies);

  return {
    userId: userId,
    //items: Array.from(todoDatabase.getItems(userId).values()),
    items: todoDatabase.getItems(userId),
  };
}

/**
 * Handle form data, FORM style.
 */
export const actions = {
  /** form: `action="?/create"` */
  create: async ({ cookies, request }) => {
    // simulate a slow network by adding an artificial delay
    await new Promise((fulfil) => setTimeout(fulfil, 3000));

    // Get form data.
    const formData = await request.formData();
    // Seems "FormDataEntryValue" can be: File | string | null.
    // Since we know what it should be, cast it as string.
    const description = formData.get('description') as string;

    try {
      todoDatabase.addItem({ description }, userLib.getUserId(cookies));
    } catch (error) {
      return fail(422, {
        // Seems these will be available in the page as "form" properties.
        description: formData.get('description'),
        error: error instanceof Error ? error.message : error,
      });
    }
  },
  /** form: `action="?/delete"` */
  delete: async ({ cookies, request }) => {
    // simulate a slow network by adding an artificial delay
    await new Promise((fulfil) => setTimeout(fulfil, 3000));

    const formData = await request.formData();
    const itemId = formData.get('itemId') as string;

    if (itemId === '') {
      return fail(422, {
        error: 'itemId is blank',
      });
    }

    todoDatabase.deleteItem(itemId, userLib.getUserId(cookies));
  },
};
