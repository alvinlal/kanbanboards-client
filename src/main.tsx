import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

if (import.meta.env.DEV) {
  const { default: worker } = await import('../mocks/browser');
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
