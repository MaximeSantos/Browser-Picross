import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

const url = 'https://browser-picross-db.pockethost.io/';
const client = new PocketBase(url);

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const puzzle = await client.collection('puzzles').getOne(params.slug);
	if (!puzzle) {
		error(404, {
			message: 'Not found'
		});
	}
	return {
		puzzle: puzzle
	};
}
// jbn2twsw3zqfdm1
