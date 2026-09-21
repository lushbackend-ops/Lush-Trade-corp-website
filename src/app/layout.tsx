import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Cinzel } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-logo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lushtradecorp.com'),
  title: 'Lush Trade Corp | Tanzania Export & Import Company',
  description: 'Lush Trade Corp Tanzania Limited connects African producers with global buyers through premium cashews, agro-commodities, coffee, pulses, timber and international sourcing.',
  keywords: [
    'Tanzania export company',
    'Tanzania cashew exporter',
    'Raw Cashew Nuts Tanzania',
    'Cashew kernel Tanzania',
    'African agro commodity exporter',
    'Tanzania coffee exporter',
    'Tanzania pulses exporter',
    'Tanzania timber exporter',
    'African sourcing partner',
    'Tanzania import export company'
  ],
  authors: [{ name: 'Lush Trade Corp Tanzania Limited' }],
  alternates: {
    canonical: 'https://www.lushtradecorp.com',
  },
  openGraph: {
    title: 'Lush Trade Corp | Tanzania Export & Import Company',
    description: 'Lush Trade Corp Tanzania Limited connects African producers with global buyers through premium cashews, agro-commodities, coffee, pulses, timber and international sourcing.',
    url: 'https://www.lushtradecorp.com',
    siteName: 'Lush Trade Corp',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lush Trade Corp Tanzania - Export and Import Company',
      },
    ],
    locale: 'en_TZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lush Trade Corp | Tanzania Export & Import Company',
    description: 'Lush Trade Corp Tanzania Limited connects African producers with global buyers through premium cashews, agro-commodities, coffee, pulses, timber and international sourcing.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '1fJRlxtEwLh23Ep1ignBLCgQXqkRBznemjR9sUGnOgs',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Lush Trade Corp Tanzania Limited",
              "url": "https://www.lushtradecorp.com",
              "email": "lushtradecorp@gmail.com",
              "telephone": "+255639354286",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Plot No. 658, near Nangwanda Stadium, P.O. Box 444",
                "addressLocality": "Mtwara",
                "addressCountry": "Tanzania"
              },
              "areaServed": ["Mtwara", "Dar es Salaam"],
              "description": "Lush Trade Corp Tanzania Limited is an export-import enterprise based in Mtwara, Tanzania, engaged in sourcing, processing and trading agro-commodities and industrial products across Africa, Asia and Europe."
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
              if (window.location.hash) {
                history.replaceState(null, '', window.location.pathname + window.location.search);
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans bg-brand-cream text-brand-dark antialiased selection:bg-brand-gold selection:text-brand-dark">
        {/* Global Google Translate Engine container */}
        <div id="google_translate_element" suppressHydrationWarning />
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.googleTranslateElementInit = function() {
                if (window.google && window.google.translate) {
                  new window.google.translate.TranslateElement(
                    {
                      pageLanguage: 'en',
                      includedLanguages: 'en,sw,hi,vi,ar,fr,zh-CN,es,de',
                      autoDisplay: false,
                    },
                    'google_translate_element'
                  );
                }
              };
            `,
          }}
        />
        <Script
          id="google-translate-script"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <SmoothScroll>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
