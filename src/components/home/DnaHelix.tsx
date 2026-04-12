export default function HeroShowcase() {
  return (
    <div className="hero-showcase" aria-hidden="true">
      {/* Main product — Retatrutide box */}
      <div className="showcase-main">
        <img
          src="/images/products/retatrutide-box-front.jpg"
          alt=""
          className="showcase-main-img"
        />
        <div className="showcase-main-glow" />
      </div>

      {/* Floating secondary products */}
      <div className="showcase-float showcase-float-1">
        <img src="/images/products/bpc-157-vial.png" alt="" />
      </div>
      <div className="showcase-float showcase-float-2">
        <img src="/images/products/retatrutide-pens.jpg" alt="" />
      </div>
      <div className="showcase-float showcase-float-3">
        <img src="/images/brand/peptivex-pouch.png" alt="" />
      </div>

      {/* Trust badges floating */}
      <div className="showcase-badge showcase-badge-1">
        <span className="showcase-badge-icon">✓</span>
        <span className="showcase-badge-text">HPLC &gt;98%</span>
      </div>
      <div className="showcase-badge showcase-badge-2">
        <span className="showcase-badge-icon">⚡</span>
        <span className="showcase-badge-text">24h shipping</span>
      </div>
      <div className="showcase-badge showcase-badge-3">
        <span className="showcase-badge-icon">🔒</span>
        <span className="showcase-badge-text">Stripe secure</span>
      </div>
    </div>
  );
}
