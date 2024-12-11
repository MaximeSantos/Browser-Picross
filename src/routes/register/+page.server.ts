import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = (async ({ cookies }) => {
	// Redirect to homepage if already logged in
	const authToken = cookies.get('pb_auth');
	if (authToken) {
		throw redirect(302, '/');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		const userName: string = data.get('userName')?.toString() || '';
		const email: string = data.get('email')?.toString() || '';
		const password: string = data.get('password')?.toString() || '';
		const passwordConfirm: string = data.get('passwordConfirm')?.toString() || '';

		// Checking for empty values
		if (!email && !userName) {
			return fail(400, {
				missing: true,
				message: 'You need a username, an email, or both to register.'
			});
		}
		if ((userName && userName.length < 3) || (userName && userName.length > 50)) {
			return fail(400, {
				email,
				userName,
				error: true,
				message: 'Username needs to be between 3 and 50 characters long.'
			});
		}
		if (!password) {
			return fail(400, { email, userName, missing: true, message: 'Missing password.' });
		}
		if (password.length < 8 || password.length > 72) {
			return fail(400, {
				email,
				userName,
				error: true,
				message: 'Password needs to be between 8 and 72 characters long.'
			});
		}
		if (!passwordConfirm) {
			return fail(400, {
				email,
				userName,
				missing: true,
				message: 'Missing password confirmation.'
			});
		}
		if (password != passwordConfirm) {
			return fail(400, {
				email,
				userName,
				error: true,
				message: 'Password and Confirm password did not match.'
			});
		}

		try {
			const user = await locals.pb?.collection('users').create({
				userName,
				email,
				password,
				passwordConfirm
			});

			// TODO Handle errors when updating username after creating the record (for example when registering with a unique email but an already existing username)
			// If there is a username given in the form, you need to first authenticate and then update the profile with the proper username. We then clear the authStore to 'logout'.
			if (user && userName) {
				await locals.pb?.collection('users').authWithPassword(user?.username, password);
				await locals.pb?.collection('users').update(user?.id, { username: userName });
			}

			locals.pb?.authStore.clear();
			return { success: true, message: 'Succesfully registered. You can now login.' };

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			locals.pb?.authStore.clear(); // TODO Hacky / To remove when all errors are properly handled
			if (e.status >= 400 && e.status <= 500) {
				return fail(e.status, {
					error: true,
					message: 'Failed to register.'
				});
			}
			if (e.status >= 500) {
				return fail(e.status, {
					error: true,
					message: 'Authentication server could not be reached.'
				});
			}
		}
	}
} satisfies Actions;
