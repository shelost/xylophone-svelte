import { supabaseClient } from "$lib/db";

export async function load({ params }) {

        console.log(params.slug)

	try {
                const { data: space, error } = await supabaseClient
                .from('spaces')
                .select('*')
                .eq('slug', params.slug)
                .single();

        return space

	} catch (e) {
	        throw Error(`Could not find space with id ${space.slug}`)
	}
}

