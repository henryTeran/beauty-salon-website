import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Pages prérendues : hydratation ; en dev : rendu classique
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
