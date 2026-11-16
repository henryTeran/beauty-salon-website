import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Soins from './pages/Soins.jsx';
import Category from './pages/Category.jsx';
import Forfaits from './pages/Forfaits.jsx';
import Domicile from './pages/Domicile.jsx';
import About from './pages/About.jsx';
import Reservation from './pages/Reservation.jsx';
import { MentionsLegales, Confidentialite } from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';
import { categories, renataFranca } from './data/services.js';

export default function App() {
  const location = useLocation();
  return (
    <Layout>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/soins-et-tarifs" element={<Soins />} />
        {[...categories, renataFranca].map((c) => (
          <Route key={c.slug} path={c.slug} element={<Category category={c} />} />
        ))}
        <Route path="/forfaits" element={<Forfaits />} />
        <Route path="/soins-a-domicile-geneve" element={<Domicile />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
