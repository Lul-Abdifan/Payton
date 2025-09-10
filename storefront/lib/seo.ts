/*
 * Helper functions for building metadata objects using Next.js Metadata API.
 *
 * These functions centralise the logic for titles, descriptions and
 * structured data (JSON‑LD) for different page types. They return plain
 * objects that can be spread into the `metadata` export on your route
 * files. You can extend these helpers to include OpenGraph, Twitter
 * cards and other SEO attributes.
 */

export const siteName = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export function productMetadata(product: { name: string; description?: string; price?: number; currency?: string; slug: string }) {
  const title = `${product.name} | Payton Suite`;
  const description = product.description?.slice(0, 160) ?? 'Product description';
  const url = `${siteName}/product/${product.slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'product',
    },
    // TODO: add JSON‑LD structured data for product
  };
}

export function articleMetadata(page: { title: string; slug: string; summary?: string }) {
  const title = `${page.title} | Payton Suite`;
  const description = page.summary ?? '';
  const url = `${siteName}/learn/${page.slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
  };
}

export function homeMetadata() {
  const title = 'Home | Payton Suite';
  const description = 'Discover fine instruments, accessories and resources at Payton Suite.';
  const url = siteName;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
  };
}