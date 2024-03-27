import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';

import getHintsFromBoard from '$lib/functions/getHintsFromBoard';

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
		// Validation for empty / missing values
		// TODO ERROR Doesnt go through validation

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

		// Generating the hints from the submitted board.
		const hints = getHintsFromBoard(parsedBoard, parsedHeight, parsedWidth);

		// Getting userId & username from the logged in user.
		const userId: string = locals.pb?.authStore.model?.id;
		const author: string = locals.pb?.authStore.model?.username;

		try {
			const record = await locals.pb?.collection('puzzles').create({
				title,
				width: parsedWidth,
				height: parsedHeight,
				rows: JSON.stringify(hints.rows),
				columns: JSON.stringify(hints.columns),
				solution: JSON.stringify(parsedBoard),
				user: userId,
				author,
				description
			});

			return { record, success: true, message: 'Puzzle successfully submitted.' };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
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
