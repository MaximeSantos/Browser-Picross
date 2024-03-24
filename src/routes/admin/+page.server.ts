import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';

import getHintsFromBoard from '$lib/functions/getHintsFromBoard';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		console.log(1, 'Begining of action');

		const data = await request.formData();
		const board = data.get('board')?.toString();
		const height = data.get('height')?.toString();
		const width = data.get('width')?.toString();
		const title = data.get('title')?.toString();
		const description = data.get('description');
		let parsedBoard: number[];
		let parsedHeight: number;
		let parsedWidth: number;
		console.log(2, 'Before validation');

		// TODO Sanitize the inputs
		// Validation for empty / missing values
		if (!title) {
			return fail(400, { missing: true, message: 'Missing title.' });
		}
		if (!board) {
			return fail(400, { missing: true, message: 'Cannot submit an empty board.' });
		} else {
			parsedBoard = JSON.parse(board);
		}
		if (!height) {
			return fail(400, {
				missing: true,
				message: 'There was an error with the height of the puzzle.'
			});
		} else {
			parsedHeight = parseInt(height);
		}
		if (!width) {
			return fail(400, {
				missing: true,
				message: 'There was an error with the width of the puzzle.'
			});
		} else {
			parsedWidth = parseInt(width);
		}
		if (parseInt(height) * parseInt(width) !== board.length) {
			return fail(400, {
				message: 'The width and height do not match the board you submitted.'
			});
		}
		console.log(3, 'After validations');

		// Generating the hints from the submitted board.
		const hints = getHintsFromBoard(parsedBoard, parsedHeight, parsedWidth);

		console.log(33, 'After generating hints');

		// Getting userId & username from the logged in user.
		const userId: string = locals.pb?.authStore.model?.id;
		const author: string = locals.pb?.authStore.model?.username;
		console.log(4, 'After getting userId & username');

		try {
			console.log(5, 'About to create record');
			const record = await locals.pb?.collection('puzzle').create({
				title,
				width: parsedWidth,
				height: parsedHeight,
				rows: hints.rows,
				columns: hints.columns,
				solution: parsedBoard,
				user: userId,
				author,
				description
			});

			return { record, success: true, message: 'Puzzle successfully submitted.' };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			console.log(6, 'CATCH');
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
