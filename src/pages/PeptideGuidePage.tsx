import { Link } from 'react-router-dom';
import { FlaskConical, Heart, Hourglass, Flame, Dumbbell, Brain, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS } from '../data/products';
import { PROTOCOLS } from '../data/protocols';
import HexPattern from '../components/home/HexPattern';
import ParticleField from '../components/home/ParticleField';
import SeoHead from '../components/SeoHead';

export default function PeptideGuidePage() {
  const { lang, formatPrice } = useLanguage();
  const pl = lang === 'pl';
  const es = lang === 'es';

  const categories = [
    {
      icon: Flame,
      color: 'text-orange-400 border-orange-500/20 from-orange-500/15',
      key: 'weight-loss',
      title: pl ? 'Badania metaboliczne' : es ? 'Investigación Metabólica' : 'Metabolic Research',
      desc: pl ? 'Peptydy badane w kontekście szlaków metabolicznych, wrażliwości insulinowej i homeostazy energetycznej.' : es ? 'Péptidos estudiados por sus vías metabólicas, sensibilidad a la insulina y homeostasis energética.' : 'Peptides studied for metabolic pathways, insulin sensitivity, and energy homeostasis.',
      peptides: ['retatrutide-40mg', 'retatrutide-20mg', 'mots-c-10mg', '5-amino-1mq-10mg'],
    },
    {
      icon: Heart,
      color: 'text-rose-400 border-rose-500/20 from-rose-500/15',
      key: 'healing',
      title: pl ? 'Regeneracja / Gojenie' : es ? 'Curación / Regeneración' : 'Healing / Regeneration',
      desc: pl ? 'Peptydy badane pod kątem naprawy tkanek, ścięgien, mięśni i ochrony jelit.' : es ? 'Péptidos estudiados para la reparación de tejidos, tendones, músculos y protección intestinal.' : 'Peptides studied for tissue repair, tendons, muscles, and gut protection.',
      peptides: ['bpc-157-5mg', 'bpc-157-10mg', 'tb-500-5mg', 'ghk-cu-50mg', 'ghk-cu-100mg'],
    },
    {
      icon: Hourglass,
      color: 'text-violet-400 border-violet-500/20 from-violet-500/15',
      key: 'longevity',
      title: pl ? 'Longevity / Mitochondria' : es ? 'Longevidad / Mitocondrial' : 'Longevity / Mitochondrial',
      desc: pl ? 'Peptydy związane ze starzeniem komórkowym, funkcją mitochondriów i naprawą DNA.' : es ? 'Péptidos relacionados con el envejecimiento celular, la función mitocondrial y la reparación del ADN.' : 'Peptides related to cellular aging, mitochondrial function, and DNA repair.',
      peptides: ['nad-100mg', 'nad-500mg', 'ss-31-10mg'],
    },
    {
      icon: Dumbbell,
      color: 'text-emerald-400 border-emerald-500/20 from-emerald-500/15',
      key: 'gh',
      title: pl ? 'Hormon wzrostu' : es ? 'Hormona del Crecimiento' : 'Growth Hormone',
      desc: pl ? 'Peptydy stymulujące naturalne pulsacyjne uwalnianie hormonu wzrostu.' : es ? 'Péptidos que estimulan la liberación natural y pulsátil de la hormona del crecimiento.' : 'Peptides stimulating natural pulsatile growth hormone release.',
      peptides: ['cjc-1295-no-dac-5mg', 'ipamorelin-5mg', 'ipamorelin-10mg'],
    },
    {
      icon: Brain,
      color: 'text-sky-400 border-sky-500/20 from-sky-500/15',
      key: 'cognitive',
      title: pl ? 'Kognitywne / Nastrój' : es ? 'Cognitivo / Estado de Ánimo' : 'Cognitive / Mood',
      desc: pl ? 'Neuropeptydy badane pod kątem funkcji poznawczych, lęku i neuroplastyczności.' : es ? 'Neuropéptidos estudiados por su función cognitiva, ansiedad y neuroplasticidad.' : 'Neuropeptides studied for cognitive function, anxiety, and neuroplasticity.',
      peptides: ['selank-5mg', 'selank-10mg'],
    },
    {
      icon: Zap,
      color: 'text-[#ea580c] border-[#fed7aa] from-amber-500/15',
      key: 'other',
      title: pl ? 'Inne' : es ? 'Otros' : 'Other',
      desc: pl ? 'Melanogeneza, kosmeceutyki i inne kategorie badawcze.' : es ? 'Melanogénesis, cosmecéuticos y otras categorías de investigación.' : 'Melanogenesis, cosmeceuticals, and other research categories.',
      peptides: ['melanotan-2-10mg', 'snap-8-10mg'],
    },
  ];

  const framework = [
    { level: '01', title: pl ? 'Fundament zdrowia' : es ? 'Salud Fundamental' : 'Foundational Health', items: pl ? ['Jakość snu', 'Trening siłowy i ruch', 'Odpowiednie spożycie białka', 'Stabilny poziom cukru we krwi', 'Zarządzanie stresem'] : ['Sleep quality', 'Strength training & movement', 'Adequate protein intake', 'Stable blood sugar', 'Stress management'] },
    { level: '02', title: pl ? 'Optymalizacja hormonalna' : es ? 'Optimización Hormonal' : 'Hormone Optimization', items: pl ? ['Estrogeny, progesteron', 'Testosteron', 'Hormony tarczycy', 'Równowaga metaboliczna'] : ['Estrogen, progesterone', 'Testosterone', 'Thyroid hormones', 'Metabolic balance'] },
    { level: '03', title: pl ? 'Precyzyjne narzędzia (peptydy)' : es ? 'Herramientas de Precisión (Péptidos)' : 'Precision Tools (Peptides)', items: pl ? ['Peptydy fundamentalne (NAD+, GHK-Cu)', 'Peptydy sezonowe (BPC-157, CJC-1295)', 'Peptydy sytuacyjne (Selank, Melanotan)'] : ['Foundational peptides (NAD+, GHK-Cu)', 'Seasonal peptides (BPC-157, CJC-1295)', 'Situational peptides (Selank, Melanotan)'] },
  ];

  return (
    <div>
      <SeoHead
        title={pl ? 'Przewodnik po peptydach badawczych 2026' : es ? 'Guía de Péptidos de Investigación 2026' : 'Research Peptide Guide 2026'}
        description={pl ? 'Kompletny przewodnik po peptydach badawczych: kategorie, dawkowanie, rekonstytucja, stacki, przechowywanie. 19 peptydów z protokołami.' : es ? 'Guía completa de péptidos de investigación: categorías, dosificación, reconstitución, combinaciones (stacks), almacenamiento. 19 péptidos con protocolos.' : 'Complete research peptide guide: categories, dosing, reconstitution, stacks, storage. 19 peptides with protocols.'}
        path={`/${lang}/guide`}
      />

      {/* Hero */}
      <div className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/[0.15] via-[#f5ebd9] to-teal-900/[0.08]" />
        <HexPattern className="text-[#ea580c]/[0.04]" />
        <ParticleField />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#fff7ed] blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 py-24 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#fff7ed] border border-[#fed7aa] rounded-full px-4 py-1.5 mb-6">
            <FlaskConical size={12} className="text-[#ea580c]" />
            <span className="text-[#ea580c] text-xs font-medium tracking-wide">2026 EDITION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a0a0a] leading-tight mb-6">
            {pl ? (
              <><span className="text-gradient">Przewodnik</span> po peptydach<br />badawczych</>
            ) : es ? (
              <>La Investigación<br /><span className="text-gradient">Guía de Péptidos</span></>
            ) : (
              <>The Research<br /><span className="text-gradient">Peptide Guide</span></>
            )}
          </h1>
          <p className="text-[#525252] text-lg max-w-xl mx-auto mb-8">
            {pl ? 'Kompletny przewodnik: kategorie, protokoły, dawkowanie, rekonstytucja, stacki i przechowywanie. 19 peptydów z danymi referencyjnymi.' : es ? 'Guía completa: categorías, protocolos, dosificación, reconstitución, combinaciones (stacks) y almacenamiento. 19 péptidos con datos de referencia.' : 'Complete guide: categories, protocols, dosing, reconstitution, stacks, and storage. 19 peptides with reference data.'
            }
          </p>
          <a href="#categories" className="cta-primary inline-flex items-center gap-2 bg-[#ea580c] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#c2410c] transition-all text-sm">
            {pl ? 'Przejdź do przewodnika' : es ? 'Ir a la guía' : 'Jump to guide'} <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Framework */}
      <section className="relative overflow-hidden section-dark py-20">
        <HexPattern className="text-[#ea580c]/[0.02]" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3">FRAMEWORK</p>
            <h2 className="text-[#0a0a0a] text-3xl font-extrabold mb-4">
              {pl ? 'Framework 3 poziomów' : es ? 'El Marco de 3 Niveles' : 'The 3-Level Framework'}
            </h2>
            <p className="text-[#737373] text-sm max-w-lg mx-auto">
              {pl ? 'Peptydy to precyzyjne narzędzia — działają najlepiej na solidnym fundamencie zdrowia.' : es ? 'Los péptidos son herramientas de precisión: funcionan mejor sobre una base de salud sólida.' : 'Peptides are precision tools — they work best on a solid health foundation.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {framework.map((f, i) => (
              <div key={i} className="relative group">
                {i < 2 && <div className="hidden sm:block absolute top-10 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent translate-x-1/2 z-0" />}
                <div className="relative z-10 why-card rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/20 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-full rounded-2xl bg-white" />
                  </div>
                  <div className="relative z-10 p-7">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-[#fed7aa] flex items-center justify-center mb-5">
                      <span className="text-[#ea580c] text-lg font-extrabold">{f.level}</span>
                    </div>
                    <h3 className="text-[#0a0a0a] text-lg font-bold mb-4">{f.title}</h3>
                    <ul className="flex flex-col gap-2">
                      {f.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-[#525252] text-sm">
                          <span className="text-[#ea580c] mt-0.5 shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories with peptide tables */}
      <section id="categories" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff7ed] via-[#f5ebd9] to-amber-900/[0.04]" />
        <HexPattern className="text-[#ea580c]/[0.02]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Katalog' : es ? 'Catálogo' : 'Catalog'}</p>
            <h2 className="text-[#0a0a0a] text-3xl font-extrabold mb-4">
              {pl ? 'Peptydy według kategorii' : es ? 'Péptidos por Categoría' : 'Peptides by Category'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-teal-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="flex flex-col gap-10">
            {categories.map((cat, ci) => {
              const prods = cat.peptides.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as typeof PRODUCTS;
              return (
                <div key={ci} className="relative rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.06] to-transparent opacity-50">
                    <div className="w-full h-full rounded-2xl bg-white" />
                  </div>
                  <div className="relative z-10">
                    {/* Category header */}
                    <div className="p-6 pb-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color.split(' ').pop()} to-transparent border ${cat.color.split(' ')[1]} flex items-center justify-center`}>
                        <cat.icon size={22} className={cat.color.split(' ')[0]} />
                      </div>
                      <div>
                        <h3 className="text-[#0a0a0a] text-lg font-bold">{cat.title}</h3>
                        <p className="text-[#737373] text-sm">{cat.desc}</p>
                      </div>
                    </div>

                    {/* Peptide table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-t border-b border-[#ececec]">
                            <th className="text-left text-[#737373] text-xs uppercase tracking-wide px-6 py-3">{pl ? 'Peptyd' : es ? 'Péptido' : 'Peptide'}</th>
                            <th className="text-left text-[#737373] text-xs uppercase tracking-wide px-4 py-3">{pl ? 'Dawka' : es ? 'Dosis' : 'Dose'}</th>
                            <th className="text-left text-[#737373] text-xs uppercase tracking-wide px-4 py-3">{pl ? 'Rekonstytucja' : es ? 'Reconstitución' : 'Reconstitution'}</th>
                            <th className="text-left text-[#737373] text-xs uppercase tracking-wide px-4 py-3">{pl ? 'Typowa dawka' : es ? 'Dosis Típica' : 'Typical Dose'}</th>
                            <th className="text-left text-[#737373] text-xs uppercase tracking-wide px-4 py-3">{pl ? 'Częstotliwość' : es ? 'Frecuencia' : 'Frequency'}</th>
                            <th className="text-left text-[#737373] text-xs uppercase tracking-wide px-4 py-3">{pl ? 'Cykl' : es ? 'Ciclo' : 'Cycle'}</th>
                            <th className="text-right text-[#737373] text-xs uppercase tracking-wide px-6 py-3">{pl ? 'Cena' : es ? 'Precio' : 'Price'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prods.map((p, pi) => {
                            const proto = PROTOCOLS[p.id];
                            return (
                              <tr key={pi} className="border-b border-white/[0.03] hover:bg-[#fafaf7] transition-colors">
                                <td className="px-6 py-3">
                                  <Link to={`/${lang}/product/${p.slug}`} className="text-[#0a0a0a] font-medium hover:text-[#ea580c] transition-colors">
                                    {pl ? p.name_pl : p.name_en}
                                  </Link>
                                </td>
                                <td className="px-4 py-3 text-[#525252]">{p.dosage}</td>
                                <td className="px-4 py-3 text-[#737373]">{proto?.reconstitution[lang] || '—'}</td>
                                <td className="px-4 py-3 text-[#525252]">{proto?.typicalDose[lang] || '—'}</td>
                                <td className="px-4 py-3 text-[#737373]">{proto?.frequency[lang] || '—'}</td>
                                <td className="px-4 py-3 text-[#737373]">{proto?.cycleLength[lang] || '—'}</td>
                                <td className="px-6 py-3 text-right text-[#ea580c] font-semibold">
                                  {formatPrice(pl ? p.price_pln : p.price_gbp)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Human vs Animal Research */}
      <section className="relative overflow-hidden section-dark py-20">
        <HexPattern className="text-[#ea580c]/[0.02]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Ważne' : es ? 'Importante' : 'Important'}</p>
            <h2 className="text-[#0a0a0a] text-3xl font-extrabold mb-4">
              {pl ? 'Badania na ludziach vs badania na zwierzętach' : es ? 'Investigación en Humanos vs. Investigación en Animales' : 'Human Research vs Animal Research'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="why-card relative rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-emerald-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"><div className="w-full h-full rounded-2xl bg-white" /></div>
              <div className="relative z-10 p-7">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mb-4" />
                <h3 className="text-[#0a0a0a] font-bold mb-3">{pl ? 'Badania kliniczne (ludzie)' : es ? 'Ensayos Clínicos (Humanos)' : 'Clinical Trials (Humans)'}</h3>
                <p className="text-[#525252] text-sm leading-relaxed mb-4">
                  {pl ? 'Niektóre peptydy (tirzepatid, tesamorelin, retatrutide) przeszły lub przechodzą badania kliniczne z udziałem ludzi. Mają ustalony profil bezpieczeństwa.' : es ? 'Algunos péptidos (tirzepatide, tesamorelin, retatrutide) han sido o están siendo sometidos a ensayos clínicos en humanos. Poseen un perfil de seguridad establecido.' : 'Some peptides (tirzepatide, tesamorelin, retatrutide) have undergone or are undergoing human clinical trials. They have an established safety profile.'
                  }
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">Retatrutide (Phase 3)</span>
                  <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">BPC-157 (Pilot 2025)</span>
                </div>
              </div>
            </div>
            <div className="why-card relative rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"><div className="w-full h-full rounded-2xl bg-white" /></div>
              <div className="relative z-10 p-7">
                <div className="w-3 h-3 rounded-full bg-amber-400 mb-4" />
                <h3 className="text-[#0a0a0a] font-bold mb-3">{pl ? 'Badania przedkliniczne (zwierzęta)' : es ? 'Estudios Preclínicos (Animales)' : 'Preclinical Studies (Animals)'}</h3>
                <p className="text-[#525252] text-sm leading-relaxed mb-4">
                  {pl ? 'Większość peptydów badawczych (MOTS-c, TB-500, Selank, SS-31) ma dane głównie z badań na modelach zwierzęcych. Wyniki zwierzęce nie zawsze przekładają się na ludzi.' : es ? 'La mayoría de los péptidos de investigación (MOTS-c, TB-500, Selank, SS-31) tienen datos principalmente de estudios en modelos animales. Los resultados en animales no siempre se traducen a humanos.' : 'Most research peptides (MOTS-c, TB-500, Selank, SS-31) have data primarily from animal model studies. Animal results do not always translate to humans.'
                  }
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa]">MOTS-c</span>
                  <span className="text-xs px-2 py-1 rounded bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa]">TB-500</span>
                  <span className="text-xs px-2 py-1 rounded bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa]">SS-31</span>
                  <span className="text-xs px-2 py-1 rounded bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa]">Selank</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-[#fafaf7] border border-[#ececec] rounded-xl p-5 text-center">
            <p className="text-[#737373] text-sm">
              {pl ? 'Wszystkie peptydy w naszej ofercie są przeznaczone wyłącznie do zastosowań badawczych i laboratoryjnych. Nie stanowią porad medycznych.' : es ? 'Todos los péptidos de nuestro catálogo están destinados exclusivamente para uso en investigación y laboratorio. No constituyen asesoramiento médico.' : 'All peptides in our catalog are intended exclusively for research and laboratory use. Not medical advice.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Quick Reference: Reconstitution */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fff7ed] via-[#f5ebd9] to-transparent" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Ściągawka' : es ? 'Hoja de Consulta Rápida' : 'Cheat Sheet'}</p>
            <h2 className="text-[#0a0a0a] text-2xl font-extrabold mb-4">
              {pl ? 'Szybka referencja: rekonstytucja' : es ? 'Referencia Rápida: Reconstitución' : 'Quick Reference: Reconstitution'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { calc: '5 mg + 2 mL → 2.5 mg/mL', example: pl ? '250 mcg = 0.1 mL = 10 jedn.' : es ? '250 mcg = 0.1 mL = 10 unidades' : '250 mcg = 0.1 mL = 10 units' },
              { calc: '10 mg + 2 mL → 5.0 mg/mL', example: pl ? '250 mcg = 0.05 mL = 5 jedn.' : es ? '250 mcg = 0.05 mL = 5 unidades' : '250 mcg = 0.05 mL = 5 units' },
              { calc: '50 mg + 3 mL → 16.7 mg/mL', example: pl ? '1.7 mg ≈ 0.10 mL ≈ 10 jedn.' : es ? '1.7 mg ≈ 0.10 mL ≈ 10 unidades' : '1.7 mg ≈ 0.10 mL ≈ 10 units' },
              { calc: pl ? 'Ogólna zasada' : es ? 'Regla general' : 'General rule', example: pl ? 'Stężenie = ilość (mg) ÷ objętość wody (mL)' : es ? 'Concentración = cantidad (mg) ÷ volumen de agua (mL)' : 'Concentration = amount (mg) ÷ water volume (mL)' },
            ].map((item, i) => (
              <div key={i} className="bg-[#fafaf7] border border-[#ececec] rounded-xl p-5 hover:border-[#fed7aa] transition-colors">
                <p className="text-[#ea580c] font-mono text-sm font-bold mb-1">{item.calc}</p>
                <p className="text-[#737373] text-xs">{item.example}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-[#a3a3a3] text-xs">
              {pl ? '1 mL = 100 jednostek na strzykawce insulinowej U-100' : es ? '1 mL = 100 unidades en una jeringa de insulina U-100' : '1 mL = 100 units on a U-100 insulin syringe'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/15 via-[#f5ebd9] to-amber-900/10" />
        <HexPattern className="text-[#ea580c]/[0.04]" />
        <ParticleField />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[#fff7ed] blur-[80px]" />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center relative z-10">
          <h2 className="text-[#0a0a0a] text-3xl sm:text-4xl font-extrabold mb-5">
            {pl ? (
              <><span className="text-gradient">Zamów</span> peptydy badawcze</>
            ) : es ? (
              <><span className="text-gradient">Solicitar</span> péptidos de investigación</>
            ) : (
              <><span className="text-gradient">Order</span> research peptides</>
            )}
          </h2>
          <p className="text-[#525252] mb-8 max-w-md mx-auto">
            {pl ? 'Czystość >98% HPLC, szybka dyskretna dostawa, bezpieczne płatności online.' : es ? 'Pureza HPLC >98%, entrega rápida y discreta, pagos online seguros.' : '>98% HPLC purity, fast discreet delivery, secure online payments.'}
          </p>
          <Link to={`/${lang}/products`} className="cta-primary inline-flex items-center gap-2 bg-[#ea580c] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#c2410c] transition-all text-sm">
            {pl ? 'Przeglądaj produkty' : es ? 'Explorar Productos' : 'Browse Products'} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
