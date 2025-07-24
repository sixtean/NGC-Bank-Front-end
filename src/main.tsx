import * as React from "react";
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./utils/ThemeContext";


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);