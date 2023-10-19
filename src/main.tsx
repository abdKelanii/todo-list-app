import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className="h-fit">
    <MantineProvider withNormalizeCSS>
      <App />
    </MantineProvider>
  </div>,
);
