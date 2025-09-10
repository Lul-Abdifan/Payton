import Image from 'next/image';

export interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

/**
 * A simple hero block with optional background image.
 */
export default function Hero({ title, subtitle, image }: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center py-16 text-center bg-gray-100 overflow-hidden">
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-gray-600 max-w-2xl">{subtitle}</p>}
    </section>
  );
}