import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogs';
import BlogArchiveClient from './BlogArchiveClient';
import { ArrowLeft, BookOpen, ChevronRight, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Intelligence & Commodity Reports',
  description:
    'Authoritative export market reports, CBT cashew harvest forecasts, outturn specifications, green coffee grades, and East African agricultural commodity trade intelligence.',
  alternates: {
    canonical: 'https://www.lushtradecorp.com/blog',
  },
  openGraph: {
    title: 'Market Intelligence & Commodity Reports | Lush Trade Corp',
    description:
      'Authoritative export market reports, CBT cashew harvest forecasts, outturn specifications, green coffee grades, and East African agricultural commodity trade intelligence.',
    url: 'https://www.lushtradecorp.com/blog',
    siteName: 'Lush Trade Corp',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lush Trade Corp Market Intelligence and Export Reports',
      },
    ],
    locale: 'en_TZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Market Intelligence & Commodity Reports | Lush Trade Corp',
    description:
      'Authoritative export market reports, CBT cashew harvest forecasts, outturn specifications, green coffee grades, and East African agricultural commodity trade intelligence.',
    images: ['/images/og-image.jpg'],
  },
};

export default function BlogArchivePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.lushtradecorp.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Market Intelligence & Blog',
        item: 'https://www.lushtradecorp.com/blog',
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Lush Trade Corp Market Intelligence & Commodity Reports',
    description:
      'Export market reports, outturn analyses, harvest calendars, and procurement intelligence covering Tanzanian raw cashew nuts, coffee, pulses, and timber.',
    url: 'https://www.lushtradecorp.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Lush Trade Corp Tanzania Limited',
      url: 'https://www.lushtradecorp.com',
      logo: 'https://www.lushtradecorp.com/images/icon-512x512.png',
    },
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-brand-cream text-brand-dark min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex items-center space-x-2 text-xs text-slate-500">
            <li>
              <Link
                href="/"
                className="hover:text-brand-coral flex items-center gap-1 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li className="font-semibold text-brand-dark" aria-current="page">
              Market Intelligence & Reports
            </li>
          </ol>
        </nav>

        {/* Page Hero Header */}
        <header className="mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 border border-brand-coral/20 shadow-xs">
            <BookOpen className="w-4 h-4 text-brand-coral" />
            <span className="text-xs font-bold text-brand-coral uppercase tracking-wider">
              B2B Commodity Intelligence Desk
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
            East Africa Commodity Market Intelligence & Export Reports
          </h1>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed">
            In-depth procurement guides, harvest yield forecasts, CBT warehouse auction analyses, outturn benchmarks, and container logistics data from Tanzania to global processing destinations.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-brand-gold via-brand-coral to-brand-emerald rounded-full mt-4" />
        </header>

        {/* Interactive Client Archive (Featured, Filters, Search, Grid) */}
        <BlogArchiveClient posts={BLOG_POSTS} />
      </div>
    </div>
  );
}
