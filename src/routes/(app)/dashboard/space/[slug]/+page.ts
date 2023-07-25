import type { PageLoad, PageLoadEvent } from './$types';
import { supabaseClient } from '$lib/db'

/*
export const load: PageLoad = async ({ page }: PageLoadEvent) => {

    const { slug } = page.page.params; // Extract params from page object
 //   const supabaseClient = getSupabase();

    // Use the slug (which is space.id) to retrieve the space details from your supabase
    const { data: space, error } = await supabaseClient
       .from('spaces')
       .eq('id', slug)
       .single();

    // Check if there was an error
    if (error) {
        console.error("Supabase query error:", error);
        return {
            status: 500,
            error: "Failed to retrieve space data from Supabase",
        };
    }

    return {
      props: {
        space, // Pass the fetched space data to the component
      },
    };
};
*/

export async function load({ params }) {
	try {
        const { data: space, error } = await supabaseClient
        .from('spaces')
        .select('*')
        .eq('id', params.slug)
        .single();

        return space

	} catch (e) {
		throw Error(404, `Could not find space with id ${params.slug}`)
	}
}

