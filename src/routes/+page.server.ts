import PocketBase from 'pocketbase';

const url = 'https://browser-picross-db.pockethost.io/';
const client = new PocketBase(url);

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const puzzle = await client.collection('puzzles').getOne('jbn2twsw3zqfdm1');
	return {
		puzzle: puzzle
	};
}
