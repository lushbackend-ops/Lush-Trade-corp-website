'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Filter,
  Layers,
  Sparkles,
  Tag,
  ArrowUpRight,
} from 'lucide-react';
import { BlogPost, BLOG_CATEGORIES, getBlogImage } from '@/data/blogs';

interface BlogArchiveClientProps {
  posts: BlogPost[];
}

export default function BlogArchiveClient({ posts }: BlogArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(9);

  // Synchronize smooth scroll with dynamic DOM height
  React.useEffect(() => {
    const lenis = (window as unknown as { lenis?: { resize: () => void } }).lenis;
    if (lenis && typeof lenis.resize === 'function') {
      requestAnimationFrame(() => {
        lenis.resize();
      });
    }
  }, [visibleCount, selectedCategory, searchQuery]);

  // Featured post is the first article (the comprehensive flagship guide)
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return otherPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.hashtags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [otherPosts, selectedCategory, searchQuery]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;
  const featuredImage = getBlogImage(featuredPost);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* ─── Featured Article Showcase ─── */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <section aria-label="Featured Commodity Guide">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white p-6 sm:p-8 lg:p-12 border border-slate-700/60 shadow-2xl overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-coral/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Featured Left Content */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    Flagship Buyer Guide
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-medium border border-white/10">
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:text-amber-200 transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
                  {featuredPost.summary}
                </p>

                {/* Key Takeaways Highlights */}
                {featuredPost.keyTakeaways && featuredPost.keyTakeaways.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block">
                      Core Commercial Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {featuredPost.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-brand-gold font-bold">✓</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm"
                  >
                    <span>Read Complete Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Featured Right Media */}
              <div className="lg:col-span-5">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="block relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-xl group-hover:border-brand-gold/40 transition-colors"
                >
                  <Image
                    src={featuredImage.src}
                    alt={featuredImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/90">
                      <span>Verified Origin Specifications</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Search and Category Toolbar ─── */}
      <section aria-label="Search and Filter Reports" className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by commodity, outturn, or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-brand-dark placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-all"
              aria-label="Search blog articles"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Layers className="w-4 h-4 text-brand-gold" />
            <span>
              Showing {displayedPosts.length} of {filteredPosts.length} reports
            </span>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(9);
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-brand-coral text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:border-brand-coral/40 hover:text-brand-coral'
                }`}
              >
                {cat === 'All' ? 'All Intelligence' : cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Articles Grid ─── */}
      {displayedPosts.length > 0 ? (
        <section aria-label="Commodity Market Reports" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedPosts.map((post) => {
              const imageInfo = getBlogImage(post);
              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-brand-coral/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Card Image */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative aspect-[16/10] bg-slate-100 overflow-hidden"
                    >
                      <Image
                        src={imageInfo.src}
                        alt={imageInfo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-200 text-[10.5px] font-bold border border-white/20">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Calendar className="w-3 h-3 text-brand-gold" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3 h-3 text-brand-gold" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-brand-dark group-hover:text-brand-coral transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>

                      {/* Hashtag Badges */}
                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {post.hashtags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold text-brand-coral bg-rose-50 px-2 py-0.5 rounded border border-brand-coral/15"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="p-5 sm:p-6 pt-0 mt-2 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-coral group-hover:text-brand-gold transition-colors"
                    >
                      <span>Read Report</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[11px] text-slate-400">
                      {post.author.replace('Lush Trade Corp ', '')}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 9)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-xs sm:text-sm text-slate-700 bg-white border border-slate-300 hover:border-brand-coral hover:text-brand-coral shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Load More Reports ({filteredPosts.length - visibleCount} remaining)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 space-y-4">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No reports matched your criteria</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search query or selecting a different commodity category from the filters above.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-5 py-2 rounded-xl bg-brand-coral text-white text-xs font-bold shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ─── Bottom Commercial Link to Products ─── */}
      <section className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent p-6 sm:p-8 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-base sm:text-lg font-bold text-brand-dark">
            Looking for Immediate Commodity Allocations?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Review certified export specifications for raw cashew nuts, cashew kernels, Arabica coffee, pulses, and kiln-dried timber.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/#products"
            className="px-5 py-2.5 rounded-xl bg-brand-dark text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            View Commodities Portfolio
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2.5 rounded-xl bg-brand-coral text-white text-xs font-bold hover:bg-rose-600 transition-colors shadow-sm"
          >
            Request Export Quotation
          </Link>
        </div>
      </section>
    </div>
  );
}
