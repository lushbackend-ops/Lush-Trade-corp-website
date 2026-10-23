import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ChevronRight,
  Home,
  CheckCircle2,
  FileText,
  Mail,
  ArrowRight,
  Tag,
  ShieldCheck,
  Building2,
  Globe2,
} from 'lucide-react';
import { BLOG_POSTS, getBlogImage, BlogPost } from '@/data/blogs';
import {
  ArticleFaqAccordion,
  ArticleShareButtons,
  TableOfContents,
} from './ArticleClientEnhancements';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Report Not Found | Lush Trade Corp',
    };
  }

  const imageInfo = getBlogImage(post);
  const canonicalUrl = `https://www.lushtradecorp.com/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription || post.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} | Lush Trade Corp`,
      description: post.metaDescription || post.summary,
      url: canonicalUrl,
      siteName: 'Lush Trade Corp',
      type: 'article',
      publishedTime: post.isoDate,
      authors: [post.author],
      images: [
        {
          url: imageInfo.src,
          width: 1200,
          height: 630,
          alt: imageInfo.alt,
        },
      ],
      locale: 'en_TZ',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Lush Trade Corp`,
      description: post.metaDescription || post.summary,
      images: [imageInfo.src],
    },
  };
}

/**
 * Slugify heading text into a valid HTML anchor ID
 */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Extract H2 and H3 headings for the Table of Contents
 */
function extractHeadings(content: string) {
  const lines = content.split('\n');
  const headings: { id: string; text: string; level: number }[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const text = trimmed.replace('## ', '').trim();
      headings.push({ id: slugifyHeading(text), text, level: 2 });
    } else if (trimmed.startsWith('### ')) {
      const text = trimmed.replace('### ', '').trim();
      headings.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }

  return headings;
}

/**
 * Lightweight, zero-dependency Markdown parser for editorial content
 */
function renderArticleContent(content: string) {
  const sections = content.split(/\n\n+/);

  return sections.map((sec, idx) => {
    const trimmed = sec.trim();

    // H2 Heading
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const firstLineBreak = trimmed.indexOf('\n');
      const headingLine = firstLineBreak !== -1 ? trimmed.slice(0, firstLineBreak) : trimmed;
      const rest = firstLineBreak !== -1 ? trimmed.slice(firstLineBreak).trim() : '';
      const headingText = headingLine.replace('## ', '').trim();
      const id = slugifyHeading(headingText);
      return (
        <div key={idx}>
          <h2
            id={id}
            className="text-xl sm:text-2xl font-extrabold text-brand-dark mt-10 sm:mt-12 mb-4 pt-6 border-t border-slate-200/70 scroll-mt-24 first:mt-4 first:border-t-0 first:pt-0"
          >
            {headingText}
          </h2>
          {rest && (
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed sm:leading-loose my-4">
              {rest}
            </p>
          )}
        </div>
      );
    }

    // H3 Heading
    if (trimmed.startsWith('### ')) {
      const firstLineBreak = trimmed.indexOf('\n');
      const headingLine = firstLineBreak !== -1 ? trimmed.slice(0, firstLineBreak) : trimmed;
      const rest = firstLineBreak !== -1 ? trimmed.slice(firstLineBreak).trim() : '';
      const headingText = headingLine.replace('### ', '').trim();
      const id = slugifyHeading(headingText);
      return (
        <div key={idx}>
          <h3
            id={id}
            className="text-lg sm:text-xl font-bold text-slate-800 mt-6 sm:mt-8 mb-3 scroll-mt-24"
          >
            {headingText}
          </h3>
          {rest && (
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed sm:leading-loose my-4">
              {rest}
            </p>
          )}
        </div>
      );
    }

    // In-Article Markdown Image: ![Alt text](image-url)
    if (trimmed.startsWith('![') && trimmed.includes('](') && trimmed.endsWith(')')) {
      const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const src = imgMatch[2];
        return (
          <figure key={idx} className="my-8 sm:my-10 space-y-2">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-900 group">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            {alt && (
              <figcaption className="text-center text-xs text-slate-500 italic px-4 leading-relaxed">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      }
    }

    // Horizontal Rule
    if (trimmed === '---') {
      return <hr key={idx} className="my-8 border-slate-200" />;
    }

    // Markdown Table
    if (trimmed.includes('|') && trimmed.includes('\n|')) {
      const tableLines = trimmed.split('\n').filter((l) => l.trim().startsWith('|'));
      if (tableLines.length >= 3) {
        const headerCells = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        const dataRows = tableLines.slice(2).map((r) =>
          r
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );

        return (
          <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  {headerCells.map((h, hi) => (
                    <th key={hi} className="px-4 py-3 whitespace-nowrap">
                      {h.replace(/\*\*/g, '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {dataRows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-slate-50/80 transition-colors">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-slate-600">
                        {cell.replace(/\*\*/g, '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    // Numbered or Bullet List
    if (trimmed.match(/^[0-9]+\.\s/) || trimmed.startsWith('- ')) {
      const listItems = trimmed.split('\n').filter(Boolean);
      const isNumbered = Boolean(listItems[0]?.match(/^[0-9]+\.\s/));

      return (
        <ul key={idx} className="space-y-2.5 my-4 text-xs sm:text-sm sm:leading-relaxed text-slate-700 pl-1">
          {listItems.map((item, li) => {
            const cleanItem = isNumbered
              ? item.replace(/^[0-9]+\.\s*/, '')
              : item.replace(/^-\s*/, '');
            // Simple bold parse
            const parts = cleanItem.split(/(\*\*.*?\*\*)/g);
            return (
              <li key={li} className="flex items-start gap-2.5">
                <span className="font-bold text-brand-coral shrink-0 mt-0.5">
                  {isNumbered ? `${li + 1}.` : '•'}
                </span>
                <span className="leading-relaxed">
                  {parts.map((p, pi) =>
                    p.startsWith('**') && p.endsWith('**') ? (
                      <strong key={pi} className="font-bold text-brand-dark">
                        {p.slice(2, -2)}
                      </strong>
                    ) : (
                      p
                    )
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      );
    }

    // Standard Paragraph with inline bold parsing
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed sm:leading-loose my-4">
        {parts.map((p, pi) =>
          p.startsWith('**') && p.endsWith('**') ? (
            <strong key={pi} className="font-bold text-brand-dark">
              {p.slice(2, -2)}
            </strong>
          ) : (
            p
          )
        )}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const imageInfo = getBlogImage(post);
  const headings = extractHeadings(post.content);
  const canonicalUrl = `https://www.lushtradecorp.com/blog/${post.slug}`;

  // Related articles from the same category or overall collection
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.id !== post.id && (p.category === post.category || true)
  ).slice(0, 3);

  // Structured Data: BlogPosting & BreadcrumbList
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.summary,
    image: [`https://www.lushtradecorp.com${imageInfo.src}`],
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://www.lushtradecorp.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lush Trade Corp Tanzania Limited',
      url: 'https://www.lushtradecorp.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.lushtradecorp.com/images/icon-512x512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.category,
        item: `https://www.lushtradecorp.com/blog?category=${encodeURIComponent(post.category)}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <article className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-brand-cream text-brand-dark min-h-screen">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
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
            <li>
              <Link href="/blog" className="hover:text-brand-coral transition-colors">
                Market Intelligence
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li className="font-semibold text-slate-700 truncate max-w-[200px] sm:max-w-none">
              {post.category}
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-coral hover:text-brand-gold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Market Reports</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4 mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-50 text-brand-coral border border-brand-coral/20 text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Verified B2B Procurement Intelligence
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author, Date & Reading Time Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-slate-200/80 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-gold/20 text-brand-dark font-bold flex items-center justify-center text-[11px]">
                LT
              </div>
              <span className="font-semibold text-slate-700">{post.author}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-gold" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 mb-8 sm:mb-10 bg-slate-900">
          <Image
            src={imageInfo.src}
            alt={imageInfo.alt}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 text-[11px] text-white/90 font-medium bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-xs">
            {imageInfo.alt}
          </div>
        </div>

        {/* Executive Summary / Introduction */}
        <div className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs mb-8 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-coral block">
            Executive Summary
          </span>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            {post.summary}
          </p>
        </div>

        {/* Key Commercial Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-transparent border border-amber-500/25 shadow-xs mb-8 space-y-3">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Key Commercial Takeaways for Buyers
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-coral font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of Contents */}
        {headings.length > 2 && <TableOfContents headings={headings} />}

        {/* Editorial Body Content */}
        <div className="prose prose-slate max-w-none">
          {renderArticleContent(post.content)}
        </div>

        {/* Technical Specifications Table (if provided) */}
        {post.specsTable && post.specsTable.length > 0 && (
          <section className="my-10 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-brand-coral uppercase tracking-wider">
                Technical Benchmark
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark">
                Verified Export Specifications & Commercial Relevance
              </h3>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Parameter</th>
                    <th className="px-4 py-3 whitespace-nowrap">Specification Standard</th>
                    <th className="px-4 py-3">Commercial Relevance for Processors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {post.specsTable.map((spec, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-brand-dark whitespace-nowrap">
                        {spec.parameter}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-brand-coral whitespace-nowrap">
                        {spec.specification}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 leading-relaxed">
                        {spec.commercialRelevance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Interactive FAQ Accordion */}
        {post.faqs && post.faqs.length > 0 && (
          <ArticleFaqAccordion faqs={post.faqs} />
        )}

        {/* Article Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-6">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            {post.hashtags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Social Share Buttons */}
        <ArticleShareButtons title={post.title} url={canonicalUrl} />

        {/* ─── Contextual B2B Export Call to Action Banner ─── */}
        <section className="my-12 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white p-6 sm:p-10 shadow-2xl border border-slate-700/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct Origin Procurement
            </span>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
              Request Export Specifications & Commercial Quotation
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Lush Trade Corp Tanzania Limited coordinates verified allocations from Mtwara and Dar es Salaam with certified outturn, moisture control, and full export documentation for wholesale buyers worldwide.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Submit Commodity Enquiry</span>
              </Link>
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-300 bg-white/10 hover:bg-white/20 hover:text-white border border-white/15 transition-all text-xs sm:text-sm cursor-pointer"
              >
                <span>View All Commodities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Related Articles ─── */}
        {relatedPosts.length > 0 && (
          <section className="pt-8 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-dark">
                Related Market Intelligence & Reports
              </h3>
              <Link
                href="/blog"
                className="text-xs font-bold text-brand-coral hover:text-brand-gold transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {relatedPosts.map((related) => {
                const rImage = getBlogImage(related);
                return (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-brand-coral/40 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <Image
                          src={rImage.src}
                          alt={rImage.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3.5 space-y-1.5">
                        <span className="text-[10px] font-bold text-brand-coral block">
                          {related.category}
                        </span>
                        <h4 className="text-xs font-bold text-brand-dark group-hover:text-brand-coral transition-colors line-clamp-2 leading-snug">
                          {related.title}
                        </h4>
                      </div>
                    </div>
                    <div className="p-3.5 pt-0 text-[10.5px] text-slate-400">
                      {related.readTime}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
