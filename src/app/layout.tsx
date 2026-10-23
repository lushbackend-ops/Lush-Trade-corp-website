import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Cinzel } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import Chatbot from '@/components/Chatbot';

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
  metadataBase: new URL('https://www.lushtradecorp.com'),
  title: {
    default: 'Tanzania Cashew Nut, Coffee & Agro Exporter | Lush Trade Corp',
    template: '%s | Lush Trade Corp',
  },
  description:
    'Lush Trade Corp Tanzania Limited sources and exports raw cashew nuts, cashew kernels, coffee, pulses and timber for international wholesale buyers. Request product specifications and export quotations.',
  keywords: [
    'Tanzania cashew exporter',
    'Tanzanian raw cashew nut supplier',
    'Raw Cashew Nuts Tanzania',
    'Cashew kernel Tanzania',
    'Tanzania coffee exporter',
    'Tanzania pulses exporter',
    'Tanzania timber exporter',
    'African agro commodity exporter',
    'Mtwara cashew export',
    'Tanzania export company',
  ],
  authors: [{ name: 'Lush Trade Corp Tanzania Limited' }],
  alternates: {
    canonical: 'https://www.lushtradecorp.com',
  },
  openGraph: {
    title: 'Tanzania Cashew Nut, Coffee & Agro Exporter | Lush Trade Corp',
    description:
      'Lush Trade Corp Tanzania Limited sources and exports raw cashew nuts, cashew kernels, coffee, pulses and timber for international wholesale buyers. Request product specifications and export quotations.',
    url: 'https://www.lushtradecorp.com',
    siteName: 'Lush Trade Corp',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lush Trade Corp Tanzania - Agricultural Commodity Exporter',
      },
    ],
    locale: 'en_TZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanzania Cashew Nut, Coffee & Agro Exporter | Lush Trade Corp',
    description:
      'Lush Trade Corp Tanzania Limited sources and exports raw cashew nuts, cashew kernels, coffee, pulses and timber for international wholesale buyers. Request product specifications and export quotations.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '1fJRlxtEwLh23Ep1ignBLCgQXqkRBznemjR9sUGnOgs',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/images/icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/images/icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.lushtradecorp.com/#organization",
                  "name": "Lush Trade Corp Tanzania Limited",
                  "url": "https://www.lushtradecorp.com",
                  "logo": "https://www.lushtradecorp.com/images/icon-512x512.png",
                  "image": "https://www.lushtradecorp.com/images/icon-512x512.png",
                  "email": "lushtradecorp@gmail.com",
                  "telephone": "+255639354286",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Plot No. 658, near Nangwanda Stadium, P.O. Box 444",
                    "addressLocality": "Mtwara",
                    "addressCountry": "Tanzania"
                  },
                  "areaServed": ["Mtwara", "Dar es Salaam", "Global"],
                  "description": "Lush Trade Corp Tanzania Limited sources and exports raw cashew nuts, cashew kernels, coffee, pulses and timber for international wholesale buyers."
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.lushtradecorp.com/#website",
                  "url": "https://www.lushtradecorp.com",
                  "name": "Lush Trade Corp",
                  "publisher": {
                    "@id": "https://www.lushtradecorp.com/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.lushtradecorp.com/blog?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
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
          <Chatbot />
        </SmoothScroll>
      </body>
    </html>
  );
}
