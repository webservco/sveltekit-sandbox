/**
 * Handle form data, API style.
 * General.
 *
 * Tutorial: API routes / POST handlers
 * https://learn.svelte.dev/tutorial/post-handlers
 */
import { json } from '@sveltejs/kit';
import * as todoDatabase from '$lib/todo/todoDatabase2';
import * as userLib from '$lib/todo/userLib';
import type { TodoItemInput } from '../../../../app.js';

/**
 * Create item.
 */
export async function POST({ request, cookies }) {
  const userId = userLib.getUserId(cookies);

  const { description } = await request.json();

  const itemId = await todoDatabase.addItem(
    { description: description } satisfies TodoItemInput,
    userId,
  );

  return json({ itemId }, { status: 201 });
}
