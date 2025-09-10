/*
 * Thin REST client for Wagtail API.
 *
 * Wagtail exposes a REST API (v2 by default) that returns JSON
 * representations of pages and other content. These helper functions
 * normalise the responses into simple shapes that can be consumed by
 * React components. Feel free to extend these functions or replace
 * them with GraphQL equivalents if your CMS exposes one.
 */

export interface WagtailPage {
  id: number;
  title: string;
  slug: string;
  content_type: string;
  meta: Record<string, unknown>;
  [key: string]: any;
}

const apiBase = process.env.WAGTAIL_API_URL;
const searchBase = process.env.WAGTAIL_SEARCH_URL;

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.warn('Wagtail fetch error', err);
    return null;
  }
}

// Fetch a page by slug. The API returns an array of pages; we return the
// first match or null.
export async function getPageBySlug(slug: string): Promise<WagtailPage | null> {
  if (!apiBase) return null;
  const url = `${apiBase}?slug=${encodeURIComponent(slug)}`;
  const data = await fetchJson<{ items: WagtailPage[] }>(url);
  return data?.items?.[0] ?? null;
}

// Fetch the home page. Adjust the type filter to match your Wagtail setup.
export async function getHome(): Promise<WagtailPage | null> {
  if (!apiBase) return null;
  // Example: filter by page type if needed (e.g. HomePage).
  const url = `${apiBase}?type=home.HomePage&limit=1`;
  const data = await fetchJson<{ items: WagtailPage[] }>(url);
  return data?.items?.[0] ?? null;
}

// Normalise a StreamField into an array of { type, value } objects. When
// using GraphQL you may not need this helper.
export function getBlocks(page: WagtailPage): { type: string; value: any }[] {
  const stream = page?.body ?? [];
  if (Array.isArray(stream)) return stream as any;
  return [];
}

// Fetch navigation menus. This is a placeholder; implement according to
// your project's Wagtail snippets or endpoints.
export async function getMenus(): Promise<any> {
  // TODO: implement menus fetcher
  return null;
}

// Search articles by query string. Returns an array of pages matching the
// query. If Wagtail search isn't configured this will return an empty
// array.
export async function searchArticles(query: string): Promise<WagtailPage[]> {
  if (!searchBase || !query) return [];
  const url = `${searchBase}?q=${encodeURIComponent(query)}`;
  const data = await fetchJson<{ items: WagtailPage[] }>(url);
  return data?.items ?? [];
}