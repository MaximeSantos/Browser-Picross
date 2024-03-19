import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	console.log('Layout load function');

	const isLoggedIn = locals.pb?.authStore.isValid || false;

	return { isLoggedIn: isLoggedIn };
}) satisfies LayoutServerLoad;
