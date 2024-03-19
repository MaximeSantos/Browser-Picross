import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const isLoggedIn = locals.pb?.authStore.isValid || false;
	const isStaff: boolean = locals.pb?.authStore.model?.staff || false;

	return {
		isLoggedIn: isLoggedIn,
		isStaff: isStaff
	};
}) satisfies LayoutServerLoad;
