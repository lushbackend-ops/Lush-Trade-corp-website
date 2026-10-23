'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS, BlogPost, BLOG_CATEGORIES, getBlogImage } from '@/data/blogs';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  X,
  ChevronDown,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import WaveDivider from './WaveDivider';

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Recalculate smooth scroll bounds whenever filtered results or visible count changes
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { resize: () => void } }).lenis;
    if (lenis && typeof lenis.resize === 'function') {
      requestAnimationFrame(() => {
        lenis.resize();
      });
    }
  }, [visibleCount, selectedCategory, searchQuery]);

  // Filter posts based on category and live search
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCat =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesQuery =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.hashtags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;
  const remainingCount = Math.max(0, filteredPosts.length - visibleCount);

  // Quick reset helper
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(4);
  };

  return (
    <section
      id="blog"
      className="py-12 sm:py-16 lg:py-24 bg-white text-brand-dark relative scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 border border-brand-coral/20 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-brand-coral" />
            <span className="text-[11px] sm:text-xs font-bold text-brand-coral uppercase tracking-wider">
              Market Intelligence Desk
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Market Intelligence & Reports"]} />
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            Harvest updates, CBT warehouse auction trends, outturn benchmarks, and commodity trade intelligence from East Africa.
          </p>

          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-brand-gold via-brand-coral to-brand-emerald mx-auto rounded-full" />
        </div>

        {/* ─── Mobile-First Navigation & Filter Bar ─── */}
        <div className="mb-6 sm:mb-10 space-y-3 sm:space-y-4">
          
          {/* Top Row: Mobile Search Input + Archive Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 p-2 sm:p-3 rounded-2xl bg-brand-cream border border-slate-200/80 shadow-xs">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(4);
                }}
                placeholder="Search by commodity, outturn, port, or grade..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-all"
                aria-label="Search market reports"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Direct Archive Link */}
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-dark hover:bg-slate-900 text-brand-gold text-xs font-bold transition-all shadow-xs border border-brand-gold/30 shrink-0"
            >
              <span>Explore All {BLOG_POSTS.length} Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Bottom Row: Mobile Horizontal Scrollable Category Pills */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x touch-pan-x"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {BLOG_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer snap-start min-h-[38px] flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold text-white shadow-sm scale-[1.02]'
                        : 'bg-white text-slate-700 border border-slate-200/90 hover:border-brand-coral/40 hover:text-brand-coral'
                    }`}
                  >
                    {isActive && <Sparkles className="w-3 h-3 text-amber-200" />}
                    <span>{cat === 'All' ? 'All Commodities' : cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Search & Filter Indicator */}
          {(selectedCategory !== 'All' || searchQuery) && (
            <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
              <span>
                Found {filteredPosts.length} report{filteredPosts.length === 1 ? '' : 's'}
                {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
                {searchQuery ? ` matching "${searchQuery}"` : ''}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-brand-coral font-bold hover:underline"
              >
                Reset
              </button>
            </div>
          )}

        </div>

        {/* ─── Blog Cards Grid (Mobile-First Touch Cards) ─── */}
        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {visiblePosts.map((post) => {
              const imageInfo = getBlogImage(post);
              return (
                <article
                  key={post.id}
                  className="bg-brand-cream rounded-2xl border border-slate-200/90 hover:border-brand-coral/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Responsive Card Visual Header */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative aspect-[16/9] sm:aspect-[16/10] bg-slate-900 overflow-hidden"
                    >
                      <Image
                        src={imageInfo.src}
                        alt={imageInfo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-200 text-[10.5px] font-bold border border-white/20">
                          {post.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold flex items-center gap-1 shadow-sm">
                          <Clock className="w-3 h-3 text-brand-gold" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Bottom Image Caption Hint */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/90 text-[11px] font-medium">
                        <span className="truncate">{post.date}</span>
                        <span className="inline-flex items-center gap-1 text-brand-gold text-[10.5px] font-bold">
                          <span>Read Report</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>

                    {/* Card Content */}
                    <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-brand-dark group-hover:text-brand-coral transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {post.summary}
                      </p>

                      {/* Hashtags */}
                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {post.hashtags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] sm:text-[11px] font-semibold text-brand-coral bg-rose-50/80 px-2 py-0.5 rounded border border-brand-coral/15"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="p-4 sm:p-6 pt-0 mt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-xs font-bold text-brand-coral group-hover:text-brand-gold transition-colors py-1"
                    >
                      <span>Read Full Report</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <span className="text-[10.5px] text-slate-500 font-medium truncate max-w-[150px]">
                      By {post.author.replace('Lush Trade Corp ', '')}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-12 px-4 rounded-2xl bg-brand-cream border border-slate-200 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              No commodity reports found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any articles matching your search. Try resetting filters or exploring the full archive.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-brand-coral text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ─── Mobile-First Action Button Strip ─── */}
        <div className="text-center pt-8 sm:pt-10 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-xl mx-auto">
            {hasMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredPosts.length))}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-2xl font-bold text-slate-700 bg-brand-cream border border-slate-300 hover:border-brand-gold hover:bg-white transition-all text-xs sm:text-sm cursor-pointer shadow-xs min-h-[44px]"
              >
                <span>Load More (+4 Reports)</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
            )}

            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold shadow-[0_4px_25px_rgba(253,80,20,0.35)] hover:shadow-[0_6px_30px_rgba(253,80,20,0.5)] hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm group cursor-pointer min-h-[44px]"
            >
              <span>Explore Full Archive ({BLOG_POSTS.length} Reports)</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-[11px] text-slate-400">
            Showing {visiblePosts.length} of {filteredPosts.length} reports in this section.
          </p>
        </div>

      </div>

      {/* Wave Curve Transition into Contact Section */}
      <WaveDivider color="#FAF9F6" position="bottom" />
    </section>
  );
}
