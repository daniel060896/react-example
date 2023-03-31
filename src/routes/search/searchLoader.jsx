export async function searchLoader({ request, params }) {
    const url = new URL(request.url);
    const qTag = params.tag || "";
    const qPage = parseInt(url.searchParams.get("page")) || 1;
    const qPageSize = parseInt(url.searchParams.get("page_size")) || 12;
    return { qTag, qPage, qPageSize };
}