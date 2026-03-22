import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/"            element={<ShopPage />} />
              <Route path="/admin"       element={<AdminPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
            </Routes>
          </Layout>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#3A1A2E',
                color: '#F0B84A',
                border: '1px solid rgba(200,80,122,0.35)',
                fontFamily: "'Tajawal', sans-serif",
                fontSize: '1rem',
                fontWeight: 500,
                borderRadius: '14px',
                padding: '12px 20px',
                direction: 'rtl',
              },
              success: { iconTheme: { primary: '#D4973A', secondary: '#3A1A2E' } },
              error: {
                style: { background: '#9B2553', color: '#fff', border: 'none' },
              },
            }}
          />
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}
