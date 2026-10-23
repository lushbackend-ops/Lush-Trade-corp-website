'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BLOG_POSTS, BlogPost, BLOG_CATEGORIES } from '@/data/blogs';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  X,
  CheckCircle2,
  ChevronDown,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { TiltCard } from '@/components/motion/tilt-card';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import WaveDivider from './WaveDivider';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Lock background scroll when article modal is open
  useEffect(() => {
    if (!selectedPost) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPost]);

  // Recalculate Lenis height when the number of visible blogs changes
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: any }).lenis;
    if (lenis && typeof lenis.resize === 'function') {
      setTimeout(() => {
        lenis.resize();
      }, 100);
    }
  }, [visibleCount, selectedCategory]);

  // Filter posts by category if selected
  const filteredPosts = BLOG_POSTS.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory
  );

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;
  const remainingCount = Math.max(0, filteredPosts.length - visibleCount);

  return (
    <section id="blog" className="py-12 sm:py-18 lg:py-24 bg-white text-brand-dark relative overflow-hidden scroll-mt-20">
      <span id="insights" className="sr-only" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 border border-brand-coral/20 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-brand-coral" />
            <span className="text-[11px] sm:text-xs font-bold text-brand-coral uppercase tracking-wider">
              Blogs
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Market Intelligence & Reports"]} />
          </h2>

          <p className="text-brand-slateMuted text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            Harvest updates, CBT auction trends, and commodity trade intelligence from East Africa.
          </p>

          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-brand-gold via-brand-coral to-brand-emerald mx-auto rounded-full" />
        </div>

        {/* Dropdown Toolbar to View More Blogs */}
        <div className="mb-8 sm:mb-10 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-brand-cream border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* 1. Dropdown: Number of Blogs to View in This Section */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-bold text-brand-dark">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
              <span>Filter Intelligence:</span>
            </div>
            
            <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <label htmlFor="blog-count-dropdown" className="sr-only">Select number of reports</label>
                <select
                  id="blog-count-dropdown"
                  value={visibleCount >= filteredPosts.length ? 'all' : visibleCount}
                  onChange={(e) => {
                    if (e.target.value === 'all') {
                      setVisibleCount(filteredPosts.length);
                    } else {
                      setVisibleCount(Number(e.target.value));
                    }
                  }}
                  className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-brand-dark shadow-sm hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 cursor-pointer transition-all"
                >
                  <option value={4}>4 Reports (Default)</option>
                  <option value={8}>8 Reports</option>
                  <option value={12}>12 Reports</option>
                  <option value={16}>16 Reports</option>
                  <option value="all">All {filteredPosts.length} Reports</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Category Filter Dropdown */}
              <div className="relative flex-1 sm:flex-initial">
                <label htmlFor="category-dropdown" className="sr-only">Filter by commodity category</label>
                <select
                  id="category-dropdown"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setVisibleCount(4);
                  }}
                  className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 shadow-sm hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 cursor-pointer transition-all truncate"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Commodities' : cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Direct link to dedicated Archive */}
          <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-dark text-brand-gold hover:bg-slate-900 text-xs font-bold transition-all shadow-sm border border-brand-gold/30"
            >
              <span>Explore Full Archive ({BLOG_POSTS.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {visiblePosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.3) }}
            >
              <TiltCard
                max={4}
                glare={true}
                className="bg-brand-cream rounded-2xl p-5 sm:p-7 lg:p-8 border border-slate-200/80 hover:border-brand-coral/50 shadow-sm hover:shadow-card-hover h-full flex flex-col justify-between group transition-all duration-300"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-rose-50 to-amber-50 text-brand-coral font-bold rounded-full text-[10px] sm:text-[11px] border border-brand-coral/20">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-2.5 sm:space-x-3">
                      <span className="flex items-center text-[10.5px] sm:text-[11px] text-slate-500">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-brand-gold" />
                        {post.date}
                      </span>
                      <span className="flex items-center text-[10.5px] sm:text-[11px] text-slate-500">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-brand-gold" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark group-hover:text-brand-coral transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                    {post.hashtags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[11px] sm:text-xs font-semibold text-brand-coral bg-rose-50/70 px-2 py-0.5 rounded border border-brand-coral/15">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 sm:pt-6 sm:mt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-xs font-bold text-brand-coral group-hover:text-brand-gold transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                    By {post.author.replace('Lush Trade Corp ', '')}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* In-Section "View More" Controls Button Strip */}
        <div className="text-center pt-8 sm:pt-10 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl mx-auto">
            {hasMore && (
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredPosts.length))}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-2xl font-bold text-slate-700 bg-brand-cream border border-slate-300 hover:border-brand-gold hover:bg-white transition-all text-xs sm:text-sm cursor-pointer shadow-xs"
              >
                <span>Show +4 More ({remainingCount} Left)</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
            )}

            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold shadow-[0_4px_25px_rgba(253,80,20,0.35)] hover:shadow-[0_6px_30px_rgba(253,80,20,0.5)] hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm group cursor-pointer"
            >
              <span>Browse All {BLOG_POSTS.length} Market Reports</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
            
          <p className="text-[11px] sm:text-xs text-slate-400">
            Showing {visiblePosts.length} of {filteredPosts.length} articles directly in this section.
          </p>
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brand-dark/85 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
        >
          <div
            data-lenis-prevent
            className="bg-white max-w-3xl w-full max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-slate-200 shadow-2xl relative space-y-4 sm:space-y-6 overscroll-contain"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="space-y-2 sm:space-y-3 pr-8 sm:pr-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-brand-mint text-brand-forest font-bold text-[10px] sm:text-xs rounded-full">
                  {selectedPost.category}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400">
                  {selectedPost.date} • {selectedPost.readTime}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400">
                  • By {selectedPost.author}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-dark leading-snug">
                {selectedPost.title}
              </h3>
            </div>

            {/* Key Takeaways Box */}
            {selectedPost.keyTakeaways && selectedPost.keyTakeaways.length > 0 && (
              <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-brand-cream border border-brand-gold/30 space-y-2 sm:space-y-2.5">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-forest flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
                  <span>Executive Takeaways</span>
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {selectedPost.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line border-t border-b border-slate-100 py-4 sm:py-6">
              {selectedPost.content}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <div className="flex flex-wrap gap-1.5">
                {selectedPost.hashtags.map((tag) => (
                  <span key={tag} className="text-[10px] sm:text-xs text-brand-leaf font-semibold bg-brand-mint/60 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <a
                  href="/#contact"
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold text-white text-xs font-bold hover:shadow-[0_4px_20px_rgba(253,50,44,0.35)] text-center transition-all"
                >
                  <span>Inquire With Trade Desk</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5" />
                </a>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Organic Wave Curve Transitioning into ContactSection */}
      <WaveDivider color="#FAF9F6" position="bottom" flip />
    </section>
  );
}
