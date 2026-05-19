import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kartuli - Gürcüce Cep Defterim',
  description: 'Gürcüce alfabe, kelime, cümle ve ders notu çalışma uygulaması.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Kartuli',
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  themeColor: '#b91c1c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}