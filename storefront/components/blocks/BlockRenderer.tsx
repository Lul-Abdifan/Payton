import Hero from './Hero';
import RichText from './RichText';
import ImageGallery from './ImageGallery';
import ProductGrid from './ProductGrid';
import FAQ from './FAQ';

export interface Block {
  type: string;
  value: any;
}

/**
 * Render a list of blocks returned from Wagtail's StreamField. The
 * `type` property is used to decide which React component to render. If
 * a block type is not recognised this renderer returns `null`. Extend
 * this function to support additional block types as needed.
 */
export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'hero':
            return <Hero key={index} {...block.value} />;
          case 'rich_text':
            return <RichText key={index} html={block.value as string} />;
          case 'image_gallery':
            return <ImageGallery key={index} images={block.value.images as string[]} />;
          case 'product_grid':
            return <ProductGrid key={index} products={block.value.products as any[]} />;
          case 'faq':
            return <FAQ key={index} items={block.value.items as any[]} />;
          default:
            return null;
        }
      })}
    </>
  );
}