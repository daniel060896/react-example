export async function homeLoader({ request }) {
    const url = new URL(request.url);
    const qPage = parseInt(url.searchParams.get("page") || 1);
    const qPageSize = parseInt(url.searchParams.get("page_size") || 12);
    return { qPage, qPageSize };
}