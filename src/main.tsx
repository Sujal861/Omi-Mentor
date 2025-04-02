
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a function to handle rendering
const renderApp = () => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }
  
  const root = createRoot(rootElement);
  root.render(<App />);
};

// Render the app
renderApp();
