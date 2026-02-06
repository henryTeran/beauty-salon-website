import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';

const ServicesPreview = lazy(() => import('../components/ServicesPreview'));
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'));
const LuxuryGallery = lazy(() => import('../components/LuxuryGallery'));
const LuxuryTestimonials = lazy(() => import('../components/LuxuryTestimonials'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-16">
    <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <div>
      <SEO
        title="GiZo Beauty - Institut de Beauté Premium à Genève | Excellence & Bien-être"
        description="Découvrez GiZo Beauty, votre institut de beauté premium à Genève. Soins du visage personnalisés, massages relaxants, manucure & pédicure. Expérience luxury et raffinée."
        keywords="institut beauté genève, spa genève, massage relaxant, soin du visage, manucure pédicure, esthéticienne genève, beauté luxury, spa premium"
        canonical="/"
      />

      <HeroSection />

      <Suspense fallback={<LoadingSpinner />}>
        <ServicesPreview />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <LuxuryGallery />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <LuxuryTestimonials />
      </Suspense>
    </div>
  );
}