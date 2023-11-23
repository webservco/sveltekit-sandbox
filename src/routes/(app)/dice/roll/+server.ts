import { json } from '@sveltejs/kit';

// "exports functions corresponding to HTTP methods"
export function GET() {
  const number = Math.floor(Math.random() * 6) + 1;

  // Return JSON data using SvelteKit convenience function.
  return json(number);
  /* Alternative:
    return new Response(JSON.stringify(number), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    */
}
