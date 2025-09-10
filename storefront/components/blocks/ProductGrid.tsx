import Link from 'next/link';
import { formatCurrency } from '../../lib/currency';

export interface Product {
  id: string;
  name: string;
  slug: string;
  pricing?: {
    priceRangeUndiscounted?: {
      start?: {
        amount?: number;
        currency?: string;
      };
    };
  };
}

export interface ProductGridProps {
  products: Product[];
}

/**
 * Render a responsive grid of product cards. Each card links to its
 * corresponding product detail page and shows the name and price. The
 * price is formatted using the helper in lib/currency.
 */
export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((p) => {
        const amount = p.pricing?.priceRangeUndiscounted?.start?.amount ?? 0;
        const currency = p.pricing?.priceRangeUndiscounted?.start?.currency ?? 'USD';
        return (
          <div key={p.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <Link href={`/product/${p.slug}`}>
              <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
              <p className="text-sm text-gray-500">{formatCurrency(amount, currency)}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}