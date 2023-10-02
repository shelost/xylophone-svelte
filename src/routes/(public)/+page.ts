import {supabaseClient} from '$lib/db'

export const ssr = false

export async function load({ params }) {

	try {
		// Fetch data from Supabase
		const { data: note, error } = await supabaseClient
		 	.from('pages')
		 	.select('*')
		 	.eq('id', '34d3da47-dbf5-4058-a056-bfea788cc86b')
		 	.single();

		if (error) {
			throw new Error(error.message);
		}
        return note;

	} catch (e) {
		throw Error(`Could not find landing page`);
	}
}
