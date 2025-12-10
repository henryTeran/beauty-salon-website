import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = "GiZo Beauty - Institut de Beauté Premium à Genève",
  description = "Découvrez GiZo Beauty, votre institut de beauté premium à Genève. Soins du visage, massages relaxants, manucure & pédicure. Réservez en ligne.",
  keywords = "institut beauté genève, spa genève, massage genève, soin visage, manucure pédicure, esthéticienne genève",
  ogImage = "https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=1200",
  canonical = ""
}) {
  const siteUrl = "https://gizobeauty.ch";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="GiZo Beauty" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="French" />
    </Helmet>
  );
}
