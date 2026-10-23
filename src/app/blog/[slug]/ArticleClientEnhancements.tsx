'use client';

import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Linkedin,
  Twitter,
  MessageCircle,
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

export function ArticleFaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-10 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-brand-coral uppercase tracking-wider">
          Procurement Knowledge Base
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="divide-y divide-slate-100">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-4 first:pt-2 last:pb-0">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-brand-coral transition-colors">
                  {faq.question}
                </span>
                <span className="p-1 rounded-lg bg-slate-100 group-hover:bg-rose-50 text-slate-500 group-hover:text-brand-coral shrink-0 transition-colors">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>
              {isOpen && (
                <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ArticleShareButtons({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200">
      <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-2">
        <Share2 className="w-3.5 h-3.5" />
        Share Report:
      </span>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-slate-100 hover:bg-[#0077b5] hover:text-white text-slate-600 transition-colors cursor-pointer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-slate-100 hover:bg-black hover:text-white text-slate-600 transition-colors cursor-pointer"
        aria-label="Share on X (Twitter)"
      >
        <Twitter className="w-3.5 h-3.5" />
      </a>

      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-slate-100 hover:bg-[#25D366] hover:text-white text-slate-600 transition-colors cursor-pointer"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}

export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: number }[];
}) {
  const [isOpen, setIsOpen] = useState(true);

  if (!headings || headings.length === 0) return null;

  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, opts: any) => void; resize: () => void } }).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.resize();
        lenis.scrollTo(element, { offset: -90, duration: 1.0 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Update browser URL hash without jump
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs mb-8 transition-all"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          In This Report ({headings.length} Sections)
        </span>
        <span className="text-xs text-brand-coral font-bold flex items-center gap-1">
          <span>{isOpen ? 'Hide' : 'Show Table of Contents'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </span>
      </button>

      {isOpen && (
        <ol className="space-y-1.5 text-xs sm:text-sm mt-3 pt-3 border-t border-slate-100 max-h-[60vh] overflow-y-auto">
          {headings.map((h, i) => (
            <li
              key={i}
              style={{ paddingLeft: h.level === 3 ? '1rem' : '0rem' }}
            >
              <a
                href={`#${h.id}`}
                onClick={(e) => handleJump(e, h.id)}
                className="text-slate-600 hover:text-brand-coral font-medium transition-colors block py-1 touch-manipulation"
              >
                {h.level === 3 ? '↳ ' : `${i + 1}. `}
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
