import type { PageServerLoad } from './$types.js';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	// Redirect to homepage if already logged in
	const authToken = cookies.get('pb_auth');
	if (authToken) {
		throw redirect(302, '/');
	}
};

export const actions = {
	default: async ({ request, locals, cookies }) => {
		const data = await request.formData();

		const email = data.get('email')?.toString() || '';
		const password = data.get('password')?.toString() || '';

		try {
			await locals.pb?.collection('users').authWithPassword(email, password);
			const isProd = process.env.NODE_ENV === 'production' ? true : false;

			if (locals.pb?.authStore.isValid) {
				cookies.set(
					'pb_auth',
					locals.pb?.authStore.exportToCookie({ secure: isProd, sameSite: 'lax', httpOnly: true }),
					{ path: '/' }
				);
				return { success: true };
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			if (e.status >= 400 && e.status <= 500) {
				return fail(e.status, {
					email,
					error: true,
					message: 'Failed to authenticate'
				});
			}
			if (e.status >= 500) {
				return fail(e.status, {
					email,
					error: true,
					message: 'Authentication server could not be reached'
				});
			}
		}
	}
};
