import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Wagtail webhook handler. Revalidates pages when content is updated.
 * The Wagtail webhook payload should include a `slug` or `tag` field
 * indicating which page or tag needs to be revalidated. Adjust this
 * implementation to match your CMS webhook schema and secure it with
 * secret headers as needed.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = body?.slug as string | undefined;
    const tag = body?.tag as string | undefined;
    if (tag) {
      await revalidateTag(tag);
    }
    if (slug) {
      // Use slug as a tag to revalidate pages that reference this slug
      await revalidateTag(slug);
    }
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return new NextResponse('Invalid payload', { status: 400 });
  }
}