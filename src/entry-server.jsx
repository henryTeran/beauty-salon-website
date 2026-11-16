import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';

export { routes, notFoundMeta, getRouteMeta } from './seo/routes.js';
export { buildHead } from './seo/head.js';
export { site } from './config/site.js';
export { categories, renataFranca, packages, generalFaq, formatDuration } from './data/services.js';

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
