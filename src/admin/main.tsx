import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { AdminApp } from './AdminApp';
import '../styles/index.css';
import './admin.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminApp />
  </StrictMode>,
);
