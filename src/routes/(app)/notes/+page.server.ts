import type { PageServerLoad } from "./$types";

export const load = (() => {

    return {
        /** @todo get data from an actual storage */
        notes: []
    }
}) satisfies PageServerLoad;
