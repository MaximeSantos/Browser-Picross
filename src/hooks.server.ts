import { DB_URL } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(DB_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
		}
	} catch (err) {
		event.locals.pb.authStore.clear();
	}

	if (event.url.pathname.startsWith('/admin')) {
		if (!event.locals.pb.authStore.isValid || !event.locals.pb?.authStore.model?.staff) {
			throw redirect(303, '/');
		}
	}

	const response = await resolve(event);

	const isProd = process.env.NODE_ENV === 'production' ? true : false;
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			httpOnly: true,
			secure: isProd,
			sameSite: isProd ? 'none' : 'lax',
			domain: isProd ? 'browser-picross.vercel.app' : 'localhost'
		})
	);
	return response;
};
