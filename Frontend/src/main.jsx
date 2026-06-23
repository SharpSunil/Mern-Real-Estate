import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </AuthProvider>
  </BrowserRouter>
);