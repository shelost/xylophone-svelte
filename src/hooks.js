// src/hooks.js
export async function handle({ request, resolve }) {
    const url = new URL(request.url);
    const isSubdomain = url.hostname === 'studio.arachne.so';

    // Redirect subdomain requests to the /app route
    if (isSubdomain && !url.pathname.startsWith('/app')) {
        return {
            status: 307,
            headers: {
                location: `/app${url.pathname}`
            }
        };
    }

    const response = await resolve(request);
    return {
        ...response
    };
}
