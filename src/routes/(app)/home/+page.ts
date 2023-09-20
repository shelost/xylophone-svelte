import type { PageLoad, PageLoadEvent } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: PageLoad = async (event: PageLoadEvent) => {
    const { user } = await event.parent();

    const { supabaseClient } = await getSupabase(event);
    const {data, error} = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();


        if (error) {
            console.error("Supabase error:", error);
            return {
                status: 500,
                error: "Internal server error."
            };
        }
    return {
        user,
        profile: data
    };
};
