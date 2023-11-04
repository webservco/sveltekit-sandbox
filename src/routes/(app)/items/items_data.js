/**
 * A simple data source.
 *
 * Inspiration: https://learn.svelte.dev/tutorial/page-data
 *
 * @todo: study how to load from a database instead
 */
export const items = [
	{
		item_id: 1,
		parent_item_id: 1,
		item_name: 'Item 1',
		item_description: 'Description 1'
	},
	{
		item_id: 2,
		parent_item_id: 1,
		item_name: 'Item 2',
		item_description: 'Description 2'
	},
	{
		item_id: 3,
		parent_item_id: 1,
		item_name: 'Item 3',
		item_description: 'Description 3'
	}
];
