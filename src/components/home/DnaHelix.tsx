export default function HeroShowcase() {
  return (
    <div className="hero-showcase">
      {/* Main product — large, clean */}
      <div className="showcase-hero-card">
        <img
          src="/images/brand/peptivex-hero-gold.jpg"
          alt="PEPTIVEX LABS Research Peptides"
          className="showcase-hero-img"
        />
        <div className="showcase-hero-overlay" />

        {/* Badge on image */}
        <div className="showcase-hero-badge">
          <span>PEPTIVEX LABS</span>
        </div>
      </div>

      {/* Product row — 3 small previews */}
      <div className="showcase-row">
        <div className="showcase-thumb">
          <img src="/images/products/retatrutide-box-front.jpg" alt="Retatrutide 40mg" />
          <span>Retatrutide</span>
        </div>
        <div className="showcase-thumb">
          <img src="/images/products/bpc-157-vial.png" alt="BPC-157" />
          <span>BPC-157</span>
        </div>
        <div className="showcase-thumb showcase-thumb-brand">
          <img src="/images/brand/peptivex-box.png" alt="PEPTIVEX packaging" />
          <span>Premium</span>
        </div>
      </div>

      {/* Trust row */}
      <div className="showcase-trust">
        <div className="showcase-trust-item">
          <span className="showcase-trust-dot trust-green" />
          <span>HPLC &gt;98%</span>
        </div>
        <div className="showcase-trust-item">
          <span className="showcase-trust-dot trust-amber" />
          <span>24h dispatch</span>
        </div>
        <div className="showcase-trust-item">
          <span className="showcase-trust-dot trust-blue" />
          <span>Bank-grade secure</span>
        </div>
      </div>
    </div>
  );
}
