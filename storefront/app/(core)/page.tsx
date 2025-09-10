import { getHome, getBlocks } from '../../lib/wagtail';
import { listProducts } from '../../lib/saleor';
import BlockRenderer from '../../components/blocks/BlockRenderer';
import ProductGrid from '../../components/blocks/ProductGrid';

/**
 * Home page. Combines content blocks from Wagtail with a set of
 * featured products from Saleor. The page uses incremental static
 * regeneration (ISR) via the default revalidate time configured in
 * Next.js (5 minutes by default). Adjust this by adding a
 * `revalidate` export if needed.
 */
export default async function HomePage() {
  const home = await getHome();
  const blocks = home ? getBlocks(home) : [];
  const products = await listProducts({ first: 4 });
  return (
    <div className="space-y-12">
      {blocks.length > 0 && <BlockRenderer blocks={blocks} />}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}