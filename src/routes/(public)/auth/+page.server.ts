import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import type { Actions, RequestEvent } from './$types';
// @ts-ignore
import { fail, redirect, type ValidationError } from '@sveltejs/kit';
import {supabaseClient} from '$lib/db'

export const actions: Actions = {
	async login(event: RequestEvent): Promise<ValidationError<{ error: string; values?: { email: string } }>> {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email) {
			return fail(400, {
				error: 'Please enter your email'
			});
		}
		if (!password) {
			return fail(400, {
				error: 'Please enter your password',
				values: {
					email
				}
			});
		}



		const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'fail credentials.',
					values: {
						email
					}
				});
			}
			return fail(500, {
				error: 'Server error. Try again later.' + error,
				values: {
					email,
				}
			});
		};



		throw redirect(303, '/home');
	},

	async signup(
		event: RequestEvent
	): Promise<ValidationError<{ error: string; values?: { email: string } }> | { message: string }> {
		const { request, url } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const full_name = formData.get('full_name') as string;

		if (!email) {
			return fail(400, {
				error: 'Please enter your email'
			});
		}
		if (!password) {
			return fail(400, {
				error: 'Please enter a password',
				values: {
					email,
					full_name
				}
			});
		}

		const { error } = await supabaseClient.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: url.origin,
				data: {full_name: full_name}
			}
		});





		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'fail credentials.',
					values: {
						email,
						full_name
					}
				});
			}

			return fail(500, {
				error: 'Server error. Try again later.' + error,
				values: {
					email,
					full_name
				}
			});
		}

		return {
			message: 'Please check your email for a magic link to log into the website.'
		};
	}
};
