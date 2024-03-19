import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }: RequestEvent) => {
	console.log('Logout load function');

	locals.pb?.authStore.clear();
	throw redirect(303, '/');
}) satisfies PageServerLoad;
