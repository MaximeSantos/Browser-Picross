import { DB_URL } from '$env/static/private';
import PocketBase from 'pocketbase';

const client = new PocketBase(DB_URL);

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const puzzles = await client.collection('puzzles').getList();
	return {
		puzzles: puzzles
	};
}
