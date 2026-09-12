import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProductsGrid from '@/components/ProductsGrid';
import USPsSection from '@/components/USPsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsGrid />
      <USPsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
