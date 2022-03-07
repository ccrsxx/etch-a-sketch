import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';

const container = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
