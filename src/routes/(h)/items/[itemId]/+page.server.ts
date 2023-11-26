/**
 * Load item details from data source.
 *
 * https://learn.svelte.dev/tutorial/page-data
 */

import { error } from '@sveltejs/kit';
import { items } from '../itemsData.js';

export function load({ params }) {
  /**
   * Get item from data source, and id from RouteParams.
   *
   * `params.itemId` is a string including the fake file extension
   * So for itemId 1, it will be "1.html".
   * Workaround to get the actual id: `parseInt`.
   */
  const item = items.find((item) => item.itemId === parseInt(params.itemId));

  // General error if item not found.
  if (!item) throw error(404);

  return {
    item,
  };
}
