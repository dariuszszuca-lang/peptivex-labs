import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from '../CookieBanner';
import PaymentNotice from '../PaymentNotice';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0c0a08] flex flex-col">
      <PaymentNotice />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
