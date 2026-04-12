import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/layout/Layout';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <Routes>
            {/* Splash — language selection */}
            <Route path="/" element={<SplashPage />} />

            {/* PL Routes */}
            <Route path="/pl" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="product/:slug" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            {/* EN Routes */}
            <Route path="/en" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="product/:slug" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
