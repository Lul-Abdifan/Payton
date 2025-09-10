import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Payton Suite',
    template: '%s | Payton Suite',
  },
  description: 'Modern storefront for Payton Suite built with Next.js 14.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}