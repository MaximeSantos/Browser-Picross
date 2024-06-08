import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';

import getHintsFromBoard from '$lib/functions/getHintsFromBoard';

export const load = (async () => {
	return;
}) satisfies PageServerLoad;

export const actions = {
	default: async () => {
		return;
	}
} satisfies Actions;
