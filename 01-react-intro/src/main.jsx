import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Brücke zwischen dem echten DOM (Browser) und React.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Unsere Hauptkomponente wird hier "gerendert" (angezeigt) */}
    <App />
  </StrictMode>,
);
