import { getProductBySlug } from '../../../lib/saleor';
import { productMetadata } from '../../../lib/seo';
import { formatCurrency } from '../../../lib/currency';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };
  return productMetadata({
    name: product.name,
    description: product.description,
    price: product.pricing?.priceRangeUndiscounted?.start?.amount,
    currency: product.pricing?.priceRangeUndiscounted?.start?.currency,
    slug: params.slug,
  }) as Metadata;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return <div className="py-8">Product not found.</div>;
  }
  const priceObj = product.pricing?.priceRangeUndiscounted?.start;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      {priceObj && (
        <p className="text-xl font-semibold">
          {formatCurrency(priceObj.amount, priceObj.currency)}
        </p>
      )}
      {product.description && (
        <div className="prose" dangerouslySetInnerHTML={{ __html: product.description }} />
      )}
    </div>
  );
}