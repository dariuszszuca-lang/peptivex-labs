import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import AgeGate from './components/AgeGate';
import Layout from './components/layout/Layout';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import BlogPostPage from './pages/BlogPostPage';
import LegalNoticePage from './pages/LegalNoticePage';
import PeptideGuidePage from './pages/PeptideGuidePage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminStats from './pages/admin/AdminStats';
import AdminShipping from './pages/admin/AdminShipping';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <BrowserRouter>
      <AgeGate>
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
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="legal" element={<LegalNoticePage />} />
              <Route path="guide" element={<PeptideGuidePage />} />
              <Route path="success" element={<SuccessPage />} />
              <Route path="cancel" element={<CancelPage />} />
            </Route>

            {/* EN Routes */}
            <Route path="/en" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="product/:slug" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="legal" element={<LegalNoticePage />} />
              <Route path="guide" element={<PeptideGuidePage />} />
              <Route path="success" element={<SuccessPage />} />
              <Route path="cancel" element={<CancelPage />} />
            </Route>

            {/* Admin Panel */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="stats" element={<AdminStats />} />
              <Route path="shipping" element={<AdminShipping />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 404 within /pl and /en */}
            <Route path="/pl/*" element={<Layout />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/en/*" element={<Layout />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            {/* Catch all (no lang prefix) */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CartProvider>
      </LanguageProvider>
      </AgeGate>
    </BrowserRouter>
  );
}
