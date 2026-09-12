import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-cream text-brand-dark px-4 text-center">
      <h1 className="text-6xl font-extrabold text-brand-gold mb-4">404</h1>
      <h2 className="text-2xl font-bold text-brand-dark mb-2">Page Not Found</h2>
      <p className="text-slate-600 max-w-md mb-8 text-sm">
        The commodity page or resource you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold text-brand-dark font-bold text-sm shadow-glow hover:scale-105 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Home Voyage
      </Link>
    </div>
  );
}
