export default function AdminCustomers() {
  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-1">Klienci</h1>
        <p className="text-white/40 text-sm">Baza klientów sklepu</p>
      </div>
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-16 text-center">
        <div className="text-4xl mb-4 opacity-20">👥</div>
        <h2 className="text-white text-lg font-semibold mb-2">Brak klientów</h2>
        <p className="text-white/30 text-sm max-w-sm mx-auto">
          Klienci pojawią się po pierwszym zamówieniu. Każda płatność Stripe tworzy profil klienta z danymi kontaktowymi i historią zakupów.
        </p>
      </div>
    </div>
  );
}
