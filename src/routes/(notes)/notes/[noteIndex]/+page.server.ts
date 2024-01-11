/**
 * Load item details from data source
 *
 * Adapted from `(h)/items/[itemId]`
 */

export function load({ params }) {
  /**
   * Local storage not available on the server side, so here we only set the noteIndex
   *
   * `params.itemId` is a string including the fake file extension
   * So for itemId 1, it will be "1.html".
   * Workaround to get the actual id: `parseInt`.
   */

  const noteIndex = parseInt(params.noteIndex);

  return {
    noteIndex,
  };
}
