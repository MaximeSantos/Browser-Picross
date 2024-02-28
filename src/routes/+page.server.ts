import PocketBase from 'pocketbase';

const url = 'https://browser-picross-db.pockethost.io/';
const client = new PocketBase(url);

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		post: await client.collection('users').getFullList({
			sort: '-created'
		})
	};
}
