import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const isLoggedIn = locals.pb?.authStore.isValid || false;
	const isStaff: boolean = locals.pb?.authStore.model?.staff || false;
	const username = locals.pb?.authStore.model?.username || '';

	return {
		isLoggedIn: isLoggedIn,
		isStaff: isStaff,
		username: username
	};
}) satisfies LayoutServerLoad;
