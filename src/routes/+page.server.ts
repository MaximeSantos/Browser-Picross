import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const puzzles = await locals.pb?.collection('puzzles').getList();
	return {
		puzzles: puzzles
	};
};
