import { items } from './items_data.js';

export function load() {
  return {
    summaries: items.map((item) => ({
      id: item.item_id,
      name: item.item_name
    }))
  };
}