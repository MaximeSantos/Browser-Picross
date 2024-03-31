import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const isLoggedIn = locals.pb?.authStore.isValid || false;
	const isStaff: boolean = locals.pb?.authStore.model?.staff || false;
	const username = locals.pb?.authStore.model?.username || '';

	// TODO Add route name to returned data
	console.log(params);

	return {
		isLoggedIn: isLoggedIn,
		isStaff: isStaff,
		username: username
	};
}) satisfies LayoutServerLoad;
