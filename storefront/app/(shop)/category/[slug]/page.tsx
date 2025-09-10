import type { Metadata } from 'next';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  return {
    title: `${params.slug} | Category`,
    description: `Browse products in the ${params.slug} category`,
  };
}

/**
 * Category page placeholder. Implement fetching of collections from
 * Saleor when available. This page currently displays the category slug.
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Category: {params.slug}</h1>
      <p className="text-gray-600">This page will list products in the {params.slug} category.</p>
    </div>
  );
}