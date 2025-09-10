import { NextResponse, NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Saleor webhook handler. When Saleor triggers a webhook this function
 * revalidates tags or paths so that ISR pages are updated. You should
 * protect this route with a secret header and validate the payload in
 * production.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tag = body?.tag as string | undefined;
    if (tag) {
      await revalidateTag(tag);
    }
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return new NextResponse('Invalid payload', { status: 400 });
  }
}