import Image from 'next/image';

export interface ImageGalleryProps {
  images: string[];
}

/**
 * Display a simple grid of images. Adjust the grid layout as needed to
 * support different numbers of columns or aspect ratios.
 */
export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((src, i) => (
        <div key={i} className="relative aspect-w-3 aspect-h-2 overflow-hidden rounded-lg bg-gray-50">
          <Image
            src={src}
            alt="Gallery image"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 33vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
}