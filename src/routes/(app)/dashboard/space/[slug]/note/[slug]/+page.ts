import { supabaseClient } from "$lib/db";

export async function load({ params }) {

	try {

        const { data: space, error } = await supabaseClient
                .from('spaces')
                .select('*')
                .eq('slug', params.slug)
                .single();


                if (!error) {
                        const { data: note, error } = await supabaseClient
                        .from('notes')
                        .select('*')
                        .eq('id', space.id)
                                .single();
                return note

                } else {
                        console.error('could not find space')
        }





	} catch (error) {
		throw Error(`Could not find space with id ${params.slug}`)
	}
}

