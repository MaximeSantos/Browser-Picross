import { fail } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	try {
		const puzzle = await locals.pb?.collection('puzzles').getOne(params.slug);

		return {
			puzzle: puzzle
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		if (e.status >= 400 && e.status <= 500) {
			return fail(e.status, { error: true, message: 'Not found' });
		}
		if (e.status >= 500) {
			return fail(e.status, {
				error: true,
				message: 'Server could not be reached'
			});
		}
	}
};
