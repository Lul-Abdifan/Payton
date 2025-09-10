import { getPageBySlug, getBlocks } from '../../../lib/wagtail';
import BlockRenderer from '../../../components/blocks/BlockRenderer';
import { articleMetadata } from '../../../lib/seo';
import type { Metadata } from 'next';

interface LearnPageProps {
  params: { slug: string[] };
}

export async function generateMetadata({ params }: LearnPageProps): Promise<Metadata> {
  const slugPath = params.slug?.join('/') ?? '';
  const page = await getPageBySlug(slugPath);
  if (!page) return { title: 'Article not found' };
  return articleMetadata({
    title: page.title,
    slug: slugPath,
    summary: page.search_description as string | undefined,
  }) as Metadata;
}

/**
 * Learn article page. Renders a Wagtail page by slug using the block
 * renderer. When the page does not exist a 404 message is displayed.
 */
export default async function LearnPage({ params }: LearnPageProps) {
  const slugPath = params.slug?.join('/') ?? '';
  const page = await getPageBySlug(slugPath);
  if (!page) {
    return <div>Article not found.</div>;
  }
  const blocks = getBlocks(page);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{page.title}</h1>
      <BlockRenderer blocks={blocks} />
    </div>
  );
}