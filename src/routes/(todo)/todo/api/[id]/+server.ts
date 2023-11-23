/**
 * Handle form data, API style.
 * Individual item.
 *
 * Tutorial: https://learn.svelte.dev/tutorial/other-handlers
 */

import * as todoDatabase from '$lib/todo/todoDatabase2';
import * as userLib from '$lib/todo/userLib';

/**
 * Delete item
 */
export async function DELETE({ params, cookies }) {
  const userId = userLib.getUserId(cookies);

  await todoDatabase.deleteItem(params.id, userId);

  return new Response(null, { status: 204 });
}
