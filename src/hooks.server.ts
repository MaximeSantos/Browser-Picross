import { DB_URL } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(DB_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// Refreshes token if authenticated user
	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
		}
	} catch (err) {
		event.locals.pb.authStore.clear();
	}

	// When accessing /admin route, redirects to homepage if not a staff user
	if (event.url.pathname.startsWith('/admin')) {
		if (!event.locals.pb.authStore.isValid || !event.locals.pb?.authStore.model?.staff) {
			throw redirect(303, '/');
		}
	}

	// When accessing /create route, redirects to login if not logged in
	if (event.url.pathname.startsWith('/submit')) {
		if (!event.locals.pb.authStore.isValid) {
			throw redirect(303, '/login');
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
