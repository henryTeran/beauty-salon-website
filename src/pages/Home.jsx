import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import ServicesPreview from '../components/ServicesPreview';
import WhyChooseUs from '../components/WhyChooseUs';
import LuxuryGallery from '../components/LuxuryGallery';
import LuxuryTestimonials from '../components/LuxuryTestimonials';

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
      <ServicesPreview />
      <WhyChooseUs />
      <LuxuryGallery />
      <LuxuryTestimonials />
    </div>
  );
}