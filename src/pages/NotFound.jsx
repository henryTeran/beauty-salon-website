import { Link } from 'react-router-dom';
import { Leaf } from '../components/ui.jsx';

export default function NotFound() {
  return (
    <section className="grain relative grid min-h-[80vh] place-items-center overflow-hidden bg-ivory pt-28 text-center">
      <Leaf className="pointer-events-none absolute left-6 top-28 w-56 opacity-50" />
      <div className="container-site relative">
        <p className="font-script text-7xl text-gold-dark">Oups…</p>
        <h1 className="display mt-4 text-5xl md:text-6xl">Page introuvable</h1>
        <p className="lead mx-auto mt-5 max-w-md">Cette page n’existe pas ou a été déplacée.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary"><span>Retour à l’accueil</span></Link>
          <Link to="/soins-et-tarifs" className="btn-ghost">Soins &amp; tarifs</Link>
        </div>
      </div>
    </section>
  );
}
