/**
 * Load items summaries from data source.
 *
 * https://learn.svelte.dev/tutorial/page-data
 */

import { items } from './items_data.js';

export function load() {
  return {
    summaries: items.map((item) => ({
      id: item.item_id,
      name: item.item_name
    }))
  };
}
