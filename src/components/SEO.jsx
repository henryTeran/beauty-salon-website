import { useEffect } from 'react';

export default function SEO({
  title = "GiZo Beauty - Institut de Beauté Premium à Genève",
  description = "Découvrez GiZo Beauty, votre institut de beauté premium à Genève. Soins du visage, massages relaxants, manucure & pédicure. Réservez en ligne.",
  keywords = "institut beauté genève, spa genève, massage genève, soin visage, manucure pédicure, esthéticienne genève",
  ogImage = "https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=1200",
  canonical = ""
}) {
  const siteUrl = "https://gizobeauty.ch";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  useEffect(() => {
    document.title = title;

    const updateMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (attribute === 'name') element.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        if (attribute === 'property') element.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    updateMetaTag('meta[name="description"]', 'name', description);
    updateMetaTag('meta[name="keywords"]', 'name', keywords);
    updateMetaTag('meta[property="og:title"]', 'property', title);
    updateMetaTag('meta[property="og:description"]', 'property', description);
    updateMetaTag('meta[property="og:image"]', 'property', ogImage);
    updateMetaTag('meta[property="og:url"]', 'property', fullCanonical);
    updateMetaTag('meta[name="twitter:title"]', 'name', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', description);
    updateMetaTag('meta[name="twitter:image"]', 'name', ogImage);

    let linkElement = document.querySelector('link[rel="canonical"]');
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('href', fullCanonical);
  }, [title, description, keywords, ogImage, fullCanonical]);

  return null;
}
