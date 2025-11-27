import React from 'react'
import ReactDOM from 'react-dom/client'
import LavaLamp from './components/LavaLamp'
import './index.css'

console.log('%c 🔥 ViViLAVA (PiliFlow) Loaded!', 'background: #222; color: #bada55; font-size: 12px');

const rootId = 'piliflow-extension-root';

if (!document.getElementById(rootId)) {
  const rootDiv = document.createElement('div');
  rootDiv.id = rootId;
  document.body.appendChild(rootDiv);

  const root = ReactDOM.createRoot(rootDiv);
  root.render(
    <React.StrictMode>
      <LavaLamp />
    </React.StrictMode>
  );
}