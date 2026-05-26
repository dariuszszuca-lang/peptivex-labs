import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from '../CookieBanner';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#f5ebd9] flex flex-col">
      <Header />
      <main className="flex-1 relative">
        {/* Decorative glow layer — scrolls with content, adds life to every page */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[8%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#ea580c]/[0.09] blur-[100px] animate-[pulse-glow_8s_ease-in-out_infinite]" />
          <div className="absolute top-[45%] left-[5%] w-[350px] h-[350px] rounded-full bg-[#f59e0b]/[0.07] blur-[90px] animate-[pulse-glow_10s_ease-in-out_infinite_reverse]" />
          <div className="absolute top-[85%] right-[15%] w-[300px] h-[300px] rounded-full bg-[#ea580c]/[0.06] blur-[80px] animate-[pulse-glow_12s_ease-in-out_infinite]" />
          <div className="absolute top-[140%] left-[20%] w-[280px] h-[280px] rounded-full bg-[#f59e0b]/[0.05] blur-[70px] animate-[pulse-glow_9s_ease-in-out_infinite_reverse]" />
        </div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
