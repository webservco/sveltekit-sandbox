import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
  name: z.string().min(4).max(30).includes('test'),
  email: z.string().email().min(6).max(10),
});

export const load = async () => {
  // Server API:
  const form = await superValidate(schema);

  // Unless you throw, always return { form } in load and form actions.
  return { form };
};

/**
 * Handle form data, FORM style.
 */
export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, schema);

    console.log('POST', form);

    // Convenient validation check:
    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated form.data

    // Yep, return { form } here too
    return { form };
  },
};
