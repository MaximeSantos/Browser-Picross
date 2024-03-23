import type { PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';

import getHintsFromBoard from '$lib/functions/getHintsFromBoard';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const board = data.get('board')?.toString();
		const height = data.get('height')?.toString();
		const width = data.get('width')?.toString();
		const title = data.get('title')?.toString();
		// const description = data.get('description');
		let parsedBoard: number[];
		let parsedHeight: number;
		let parsedWidth: number;

		// Validation
		if (!title) {
			return fail(400, { missing: true, message: 'Missing title.' });
		}
		if (!board) {
			return fail(400, { missing: true, message: 'Cannot submit and empty board.' });
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

		const hints = getHintsFromBoard(parsedBoard, parsedHeight, parsedWidth);
		console.log(hints);
	}
};
