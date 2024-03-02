import PocketBase from 'pocketbase';

const url = 'https://browser-picross-db.pockethost.io/';
const client = new PocketBase(url);

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const puzzles = await client.collection('puzzles').getList();
	return {
		puzzles: puzzles
	};
}
