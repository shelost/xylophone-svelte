import { supabaseClient } from "$lib/db";

export const ssr = false

export async function load({ params }) {

        try {

                const { data: note, error } = await supabaseClient
                .from('pages')
                .select('*')
                .eq('id', params.slug)
                .single();

                return note

	} catch (e) {
		throw Error(`Could not find space with id ${params.slug}`)
	}
}

