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
    <section id="blog" className="py-24 bg-white text-brand-dark relative overflow-hidden scroll-mt-20">
      <span id="insights" className="sr-only" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-mint border border-brand-leaf/20">
            <BookOpen className="w-3.5 h-3.5 text-brand-forest" />
            <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
              Blogs
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Market Intelligence & Reports"]} />
          </h2>

          <p className="text-brand-slateMuted text-base max-w-xl mx-auto">
            Harvest updates, CBT auction trends, and commodity trade intelligence from East Africa.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-brand-gold to-brand-forest mx-auto rounded-full" />
        </div>

        {/* Dropdown Toolbar to View More Blogs */}
        <div className="mb-10 p-5 rounded-3xl bg-brand-cream border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* 1. Dropdown: Number of Blogs to View in This Section */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center space-x-2 text-xs font-bold text-brand-dark">
              <Layers className="w-4 h-4 text-brand-gold shrink-0" />
              <span>View More Blogs:</span>
            </div>
            
            <div className="relative inline-block">
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
                className="appearance-none pl-3.5 pr-9 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-brand-dark shadow-sm hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 cursor-pointer transition-all"
                aria-label="Select number of blogs to display"
              >
                <option value={4}>4 Blogs (Default)</option>
                <option value={8}>8 Blogs</option>
                <option value={12}>12 Blogs</option>
                <option value={16}>16 Blogs</option>
                <option value="all">All 20 Blogs ({filteredPosts.length} total)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative inline-block">
              <select
                id="category-dropdown"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setVisibleCount(4);
                }}
                className="appearance-none pl-3.5 pr-9 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 shadow-sm hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 cursor-pointer transition-all"
                aria-label="Filter blogs by category"
              >
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 2. Dropdown: Jump directly to any of the 20+ articles */}
          <div className="flex items-center space-x-2.5 w-full md:w-auto justify-end">
            <span className="text-xs font-bold text-brand-dark hidden sm:inline whitespace-nowrap">
              Jump to Report:
            </span>
            <div className="relative w-full sm:w-64">
              <select
                defaultValue=""
                onChange={(e) => {
                  const post = BLOG_POSTS.find((p) => p.id === e.target.value);
                  if (post) setSelectedPost(post);
                  e.target.value = '';
                }}
                className="w-full appearance-none pl-3.5 pr-9 py-2 rounded-xl bg-brand-forest text-brand-gold border border-brand-gold/40 text-xs font-bold shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 cursor-pointer truncate transition-all"
                aria-label="Jump directly to any blog article"
              >
                <option value="" disabled className="bg-white text-slate-800">
                  ⚡ Open Any of 20 Reports ▾
                </option>
                {BLOG_POSTS.map((p, idx) => (
                  <option key={p.id} value={p.id} className="bg-white text-slate-800 py-1">
                    {idx + 1}. [{p.category}] {p.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-brand-gold absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
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
                className="bg-brand-cream rounded-2xl p-8 border border-slate-200/80 hover:border-brand-gold/50 shadow-sm hover:shadow-card-hover h-full flex flex-col justify-between group cursor-pointer transition-all duration-300"
                onClick={() => setSelectedPost(post)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="px-3 py-1 bg-brand-mint text-brand-forest font-bold rounded-full text-[11px] border border-brand-leaf/20">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center text-[11px] text-slate-500">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-brand-gold" />
                        {post.date}
                      </span>
                      <span className="flex items-center text-[11px] text-slate-500">
                        <Clock className="w-3.5 h-3.5 mr-1 text-brand-gold" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-forest transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.hashtags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-brand-forest bg-brand-mint/60 px-2.5 py-0.5 rounded border border-brand-leaf/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="inline-flex items-center text-xs font-bold text-brand-forest group-hover:text-brand-gold transition-colors">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <span className="text-[11px] font-medium text-slate-500">
                    By {post.author.replace('Lush Trade Corp ', '')}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* In-Section "View More" Controls Button Strip */}
        {hasMore && (
          <div className="text-center pt-10 space-y-3">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredPosts.length))}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl font-bold text-brand-dark bg-gradient-to-r from-brand-gold to-brand-goldLight shadow-glow hover:scale-105 transition-all text-sm group cursor-pointer"
              >
                <span>View More in This Section (+4 More • {remainingCount} Available)</span>
                <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setVisibleCount(filteredPosts.length)}
                className="px-6 py-3.5 rounded-2xl font-semibold text-xs text-slate-700 bg-brand-cream border border-slate-300 hover:border-brand-gold hover:bg-white transition-all shadow-sm cursor-pointer"
              >
                Display All {filteredPosts.length} Blogs
              </button>
            </div>
            
            <p className="text-xs text-slate-400">
              Showing {visiblePosts.length} of {filteredPosts.length} articles directly in this section.
            </p>
          </div>
        )}

      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-dark/85 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
        >
          <div
            data-lenis-prevent
            className="bg-white max-w-3xl w-full max-h-[88vh] overflow-y-auto rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl relative space-y-6 overscroll-contain"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-brand-mint text-brand-forest font-bold text-xs rounded-full">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-slate-400">
                  {selectedPost.date} • {selectedPost.readTime}
                </span>
                <span className="text-xs text-slate-400">
                  • By {selectedPost.author}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark leading-snug">
                {selectedPost.title}
              </h3>
            </div>

            {/* Key Takeaways Box */}
            {selectedPost.keyTakeaways && selectedPost.keyTakeaways.length > 0 && (
              <div className="p-5 rounded-2xl bg-brand-cream border border-brand-gold/30 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-forest flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
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

            <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-b border-slate-100 py-6">
              {selectedPost.content}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {selectedPost.hashtags.map((tag) => (
                  <span key={tag} className="text-xs text-brand-leaf font-semibold bg-brand-mint/60 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <a
                  href="/#contact"
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-brand-gold text-brand-dark text-xs font-bold hover:bg-yellow-400 text-center transition-colors"
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
