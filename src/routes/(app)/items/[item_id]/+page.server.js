/**
 * Load item details from data source.
 *
 * https://learn.svelte.dev/tutorial/page-data
 */

import { error } from '@sveltejs/kit';
import { items } from '../items_data.js';

export function load({ params }) {
    /**
     * Get item form data source, but id from RouteParams.
     *
     * `params.item_id` is a string including the fake file extension
     * So for item_id 1, it will be "1.html".
     * Workaround to get the actual id: `parseInt`.
     */
    const item = items.find((item) => item.item_id === parseInt(params.item_id));

    // General error if item not found.
    if (!item) throw error(404);

    return {
        item
    };
}
