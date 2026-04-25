import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, Truck, CreditCard, LogOut, ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [collapsed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const isAdmin = localStorage.getItem('px-admin') === 'true' && !!localStorage.getItem('px-admin-password');

  const tryLogin = async (val: string) => {
    if (!val) {
      setLoginError('Wpisz hasło');
      return;
    }
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin-orders', {
        headers: { 'X-Admin-Password': val },
      });
      if (res.ok) {
        localStorage.setItem('px-admin', 'true');
        localStorage.setItem('px-admin-password', val);
        window.location.reload();
      } else {
        setLoginError(`Nieprawidłowe hasło (HTTP ${res.status})`);
      }
    } catch (e) {
      setLoginError(`Błąd połączenia: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoginLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-4">
        <form
          onSubmit={(e) => { e.preventDefault(); tryLogin(password); }}
          className="max-w-sm w-full text-center"
        >
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-white text-xl font-bold mb-4">Admin Panel</h1>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setLoginError(null); }}
            autoFocus
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm mb-3 focus:border-amber-500/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {loginLoading ? <Loader2 size={16} className="animate-spin" /> : null}
            Zaloguj
          </button>
          {loginError && <p className="text-red-400 text-xs mt-3">{loginError}</p>}
          <p className="text-white/20 text-xs mt-3">Hasło: {password.length} znaków</p>
        </form>
      </div>
    );
  }

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/products', icon: Package, label: 'Produkty', end: false },
    { to: '/admin/orders', icon: ShoppingCart, label: 'Zamówienia', end: false },
    { to: '/admin/customers', icon: Users, label: 'Klienci', end: false },
    { to: '/admin/stats', icon: BarChart3, label: 'Statystyki', end: false },
    { to: '/admin/shipping', icon: Truck, label: 'InPost', end: false },
    { to: '/admin/payments', icon: CreditCard, label: 'Stripe', end: false },
    { to: '/admin/settings', icon: Settings, label: 'Ustawienia', end: false },
  ];

  return (
    <div className="min-h-screen bg-[#0c0a08] flex">
      <Helmet>
        <title>Admin — PEPTIVEX LABS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-[#0a0908] border-r border-amber-500/[0.06] flex flex-col transition-all duration-200 shrink-0`}>
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-white/[0.04]">
          <span className="text-lg font-extrabold">
            <span className="text-teal-400">P</span>
            <span className="text-amber-500">X</span>
          </span>
          {!collapsed && <span className="text-xs font-bold text-white/60 ml-2 tracking-widest">ADMIN</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 font-medium'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                }`
              }
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-white/[0.04] flex flex-col gap-1">
          <button
            onClick={() => navigate('/pl')}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/30 hover:text-white/50 transition-colors"
          >
            <ArrowLeft size={18} />
            {!collapsed && <span>Sklep</span>}
          </button>
          <button
            onClick={() => { localStorage.removeItem('px-admin'); localStorage.removeItem('px-admin-password'); window.location.reload(); }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/30 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            {!collapsed && <span>Wyloguj</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
