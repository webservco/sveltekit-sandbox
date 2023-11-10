/**
 * Load items summaries from data source.
 *
 * https://learn.svelte.dev/tutorial/page-data
 *
 * Renamed from `+page.server.js` to `+layout.server.js`
 * => data (result of load()) will be available in
 * both the current layout and sub-layouts.
 * https://learn.svelte.dev/tutorial/layout-data
 *
 * "Data returned from layout load functions is available to child +layout.svelte components and the +page.svelte component as well as the layout that it 'belongs' to."
 * https://kit.svelte.dev/docs/load
 */

import { items } from './itemsData.js';

export function load() {
  return {
    summaries: items.map((item) => ({
      id: item.itemId,
      name: item.itemName
    }))
  };
}
