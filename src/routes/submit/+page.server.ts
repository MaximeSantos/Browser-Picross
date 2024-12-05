import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const board = data.get('board')?.toString();
		const height = data.get('height')?.toString();
		const width = data.get('width')?.toString();
		const title = data.get('title')?.toString();
		const description = data.get('description');
		const parsedBoard = JSON.parse(board || '');
		const parsedHeight = parseInt(height || '');
		const parsedWidth = parseInt(width || '');

		// TODO Sanitize the inputs
		// TODO When we allow for more custom size boards, we might have to allow non-unique solutions and check for uniqueness differently because one solution might look differently depending on the board size and shape

		// Validation for empty / missing values
		if (!parsedBoard) {
			return fail(400, { missing: true, message: 'Cannot submit an empty board.' });
		}
		if (!title) {
			return fail(400, { missing: true, message: 'Missing title.' });
		}
		if (!height || !width || parseInt(height) * parseInt(width) !== parsedBoard.length) {
			return fail(400, {
				missing: true,
				message: 'There was an error with the size of your puzzle.'
			});
		}

		// Getting userId & username from the logged in user.
		const userId: string = locals.pb?.authStore.model?.id;
		const author: string = locals.pb?.authStore.model?.username;

		try {
			const record = await locals.pb?.collection('puzzles').create({
				title,
				width: parsedWidth,
				height: parsedHeight,
				solution: JSON.stringify(parsedBoard),
				user: userId,
				show: false,
				author,
				description
			});

			return {
				record,
				success: true,
				message:
					'Puzzle successfully submitted. An admin will now review it before it becomes visible to other users.'
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			// Catches errors relative to unique values for the puzzles (title and solution)
			if (e.response.data.solution?.code == 'validation_not_unique') {
				return fail(e.status, {
					error: true,
					message: 'The puzzle you submitted already exists.'
				});
			}
			if (e.response.data.title?.code == 'validation_not_unique') {
				return fail(e.status, {
					error: true,
					message: 'This title already exists.'
				});
			}

			// Catches more general errors
			if (e.status >= 400 && e.status <= 500) {
				return fail(e.status, {
					error: true,
					message: 'There was an error when submitting your puzzle.'
				});
			}
			if (e.status >= 500) {
				return fail(e.status, {
					error: true,
					message: 'Servers could not be reached.'
				});
			}
		}
	}
} satisfies Actions;
