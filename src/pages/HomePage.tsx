import React, { useState } from 'react';
import { ArrowRight, Coffee, MapPin, Clock, Phone } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';
import { CAFE_INFO } from '../data/config';
import { MenuItem } from '../types';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  onNavigateToMenu: (categoryId?: string) => void;
  onSelectProduct: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToMenu,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMouseOffset({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Curated signature items for the homepage
  const signatureItems = MENU_ITEMS.filter((item) => item.isSignature || item.popular).slice(0, 6);

  return (
    <div className="pb-20">
      
      {/* ================= HERO SECTION (MATCHING BRWW EDITORIAL COMPOSITION WITH DYNAMIC SPLASH HERO) ================= */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleHeroMouseLeave}
        className="relative overflow-hidden bg-gradient-to-br from-[#160D07] via-[#22140C] to-[#0F0804] text-white border-b border-swan-gold/20 pt-10 pb-16 lg:pt-14 lg:pb-20 flex items-center min-h-[680px] lg:min-h-[760px]"
      >
        {/* Ambient Warm Golden Backlight Glow */}
        <div 
          className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[520px] h-[520px] lg:w-[680px] lg:h-[680px] bg-swan-gold/20 rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mouseOffset.x * 25}px, ${mouseOffset.y * 25}px)`,
          }}
        />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-swan-espresso/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            
            {/* ================= LEFT COLUMN: CLEAN EDITORIAL TYPOGRAPHY & CTAS ================= */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-6 text-left">
              
              {/* Category Pill Badge (Matching BRWW Pill) */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-swan-sand/80 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-swan-amber animate-pulse" />
                <span>Specialty Coffee & Handcrafted Bakery • Est. 2024</span>
              </div>

              {/* Grand Headline: Bold Serif + Warm Amber */}
              <div className="space-y-1">
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-md">
                  Good Food <br />
                  <span className="text-swan-amber font-serif">
                    Starts Here!
                  </span>
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-sm sm:text-base lg:text-lg text-swan-sand/85 max-w-xl leading-relaxed font-sans drop-shadow-sm">
                Freshly glazed brioche donuts, hand-pulled espresso, and artisan shakes. Prepared fresh daily from dawn to midnight for an exceptional café experience.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigateToMenu()}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-swan-gold hover:bg-swan-amber text-swan-dark font-extrabold text-sm tracking-wide shadow-gold hover:shadow-xl transition-all duration-300 active:scale-95 group"
                >
                  <span>Explore Menu (50% Off)</span>
                  <ArrowRight className="w-4 h-4 text-swan-dark group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigateToMenu('donuts')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm tracking-wide border border-white/15 transition-all duration-300 active:scale-95 hover:border-swan-gold/50"
                >
                  <span>Fresh Glazed Donuts</span>
                </button>
              </div>

            </div>

            {/* ================= RIGHT COLUMN: PROMINENT FULL-HERO SPLASH & CUPS ================= */}
            <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center lg:justify-end">
              
              {/* Floating Interactive Image Container */}
              <div
                className="relative w-full max-w-xl lg:max-w-3xl cursor-pointer select-none group"
                style={{
                  transform: `perspective(1000px) rotateY(${mouseOffset.x * 8}deg) rotateX(${-mouseOffset.y * 8}deg) translate3d(${mouseOffset.x * 16}px, ${mouseOffset.y * 16}px, 0px) scale(${isHovered ? 1.03 : 1})`,
                  transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              >
                {/* Continuous Gentle Floating Animation */}
                <div className="animate-float">
                  <img
                    src="/assets/images/swan-splash-donut.webp"
                    alt="Swan Cafe Signature Coffee Splash and Fresh Pink Donut"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto max-h-[580px] lg:max-h-[680px] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)] filter brightness-[1.02] contrast-[1.04]"
                  />
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Main Content Sections with Standard Spacing */}
      <div className="space-y-20 mt-16 sm:mt-20">

        {/* ================= 50% OFF PROMO BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-swan-espresso border border-swan-gold/30 shadow-luxury p-6 sm:p-8 text-white">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-swan-amber block">
                Exclusive Season Privilege
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                50% Off All Menu Items
              </h2>
              <p className="text-xs sm:text-sm text-swan-sand/80 max-w-xl">
                Enjoy 50% flat discount across our entire handcrafted donut and specialty beverage menu. All prices are automatically discounted by 50% across the board with voucher <strong className="text-swan-amber font-mono">SWAN50</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-swan-dark px-4 py-2.5 rounded-xl border border-swan-gold/40 text-center">
                <span className="text-[9px] text-swan-sand/70 block uppercase font-bold tracking-widest">
                  Voucher
                </span>
                <span className="font-mono font-bold text-lg text-swan-amber">
                  SWAN50
                </span>
              </div>
              <button
                onClick={() => onNavigateToMenu()}
                className="px-6 py-3 rounded-xl bg-swan-gold hover:bg-swan-amber text-swan-dark font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY DISCOVERY ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-swan-caramel">
            Explore By Category
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-swan-dark">
            Crafted For Every Craving
          </h2>
          <p className="text-sm text-swan-cocoa/80">
            From steaming morning espresso to icy afternoon smoothies and late-night sweet treats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigateToMenu(cat.id)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-swan-sand/50 shadow-sm hover:shadow-luxury-hover transition-all duration-300 cursor-pointer flex flex-col h-72"
            >
              <div className="relative flex-1 overflow-hidden">
                <img
                  src={cat.bannerImage}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-swan-dark via-swan-dark/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-swan-amber block mb-1">
                      Menu Collection
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mb-1.5 flex items-center justify-between">
                      {cat.name}
                      <ArrowRight className="w-5 h-5 text-swan-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                    <p className="text-xs text-swan-sand/80 line-clamp-2">
                      {cat.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SIGNATURE CREATIONS SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-swan-sand/40 pb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-swan-caramel mb-1">
              Curated House Specials
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-swan-dark">
              Signature Favorites
            </h2>
          </div>
          <button
            onClick={() => onNavigateToMenu()}
            className="inline-flex items-center gap-2 text-xs font-bold text-swan-mocha hover:text-swan-dark uppercase tracking-wider transition-colors"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 pt-20">
          {signatureItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* ================= CRAFT & FRESH BAKERY ================= */}
      <section className="bg-swan-parchment/60 py-16 lg:py-20 border-y border-swan-sand/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Photography Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md border border-swan-sand aspect-[3/4]">
                  <img
                    src="/assets/images/cappuccino.webp"
                    alt="Swan Latte Art Barista Pour"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 bg-white rounded-2xl border border-swan-sand/60 shadow-sm text-center">
                  <span className="font-script text-2xl text-swan-caramel font-bold block mb-1">
                    Good Mood
                  </span>
                  <p className="text-xs text-swan-cocoa">
                    Fresh coffee and warm donuts, served daily with genuine care.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="p-5 bg-swan-espresso text-white rounded-2xl border border-swan-gold/30 shadow-md text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-swan-sand">
                    Baked Fresh Daily
                  </div>
                  <p className="text-xs text-swan-sand/80 mt-1">
                    Glazed in small batches every morning and afternoon.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md border border-swan-sand aspect-[3/4]">
                  <img
                    src="/assets/images/pink-glazed-donut.webp"
                    alt="Swan Fresh Glazed Brioche Donut"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-swan-caramel">
                About Swan Cafe
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-swan-dark leading-tight">
                Freshly Made Donuts. <br />
                Seriously Good Coffee.
              </h2>

              <p className="text-sm sm:text-base text-swan-cocoa leading-relaxed">
                Swan Cafe was created to bring honest, high-quality coffee and freshly glazed donuts together under one roof. We pull our espresso from 100% Arabica beans and prepare our glazes from scratch every single day.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-swan-sand/60">
                  <div className="w-9 h-9 rounded-lg bg-swan-pinkLight flex items-center justify-center text-swan-pinkDeep flex-shrink-0">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-swan-dark">Small-Batch Glazes</h4>
                    <p className="text-xs text-swan-cocoa/80 mt-0.5">
                      Strawberry, Belgian chocolate ganache, and salted caramel prepared fresh daily.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-swan-sand/60">
                  <div className="w-9 h-9 rounded-lg bg-swan-parchment flex items-center justify-center text-swan-caramel flex-shrink-0">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-swan-dark">Specialty Hot & Cold Brews</h4>
                    <p className="text-xs text-swan-cocoa/80 mt-0.5">
                      From traditional Turkish sand brews to Spanish lattes and cold-pressed coolers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateToMenu()}
                  className="px-7 py-3 rounded-full bg-swan-espresso hover:bg-swan-dark text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
                >
                  Explore Complete Menu
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= GUEST REVIEWS & PRAISE ================= */}
      <section id="reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-28">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-swan-caramel">
            Community Love & Praise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-swan-dark">
            What Our Patrons Say
          </h2>
          <p className="text-sm text-swan-cocoa/80">
            Real feedback from specialty coffee lovers and freshly glazed donut regulars in Gulberg.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Hamza Tariq',
              role: 'Specialty Coffee Enthusiast',
              rating: 5,
              title: 'Best Spanish Latte in Gulberg!',
              comment: 'The textured swan latte art and condensed milk balance is sublime. Swan Cafe has raised the bar for boutique coffee in Lahore.',
              item: 'Spanish Latte & Pink Glazed Donut'
            },
            {
              name: 'Ayesha Mehmood',
              role: 'Food & Lifestyle Blogger',
              rating: 5,
              title: 'Warm Brioche Donuts Are A Dream',
              comment: 'You can immediately tell their donuts are fried fresh three times a day. Melt-in-mouth soft dough with real Belgian dark chocolate ganache!',
              item: 'Classic Glazed & Boston Cream'
            },
            {
              name: 'Bilal Farooq',
              role: 'Daily Morning Regular',
              rating: 5,
              title: 'World-Class Branding & Packaging',
              comment: 'The custom takeaway cups, napkins, and 50% season discount make this an easy everyday choice. Fast pickup and lovely counter service.',
              item: 'Arabic Gahwa & Iced Caramel Latte'
            }
          ].map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-swan-sand/60 shadow-sm hover:shadow-luxury-hover transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-swan-gold text-sm gap-0.5">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-swan-gold/15 text-swan-dark font-mono">
                    Verified Guest
                  </span>
                </div>
                <h4 className="font-serif font-bold text-lg text-swan-dark">
                  "{rev.title}"
                </h4>
                <p className="text-xs sm:text-sm text-swan-cocoa/90 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-swan-sand/40 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-swan-dark">{rev.name}</div>
                  <div className="text-[10px] text-swan-mocha">{rev.role}</div>
                </div>
                <span className="text-[10px] text-swan-caramel font-medium bg-swan-cream px-2 py-1 rounded-lg">
                  {rev.item}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VISIT OUR CAFÉ (REAL STORE DETAILS) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-swan-espresso text-white border border-swan-gold/30 shadow-luxury overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Info Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-swan-amber">
                Visit Us In Person
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                A Welcoming Space in Gulberg
              </h2>

              <p className="text-sm text-swan-sand/80 leading-relaxed max-w-xl">
                Whether you need a quick morning espresso to go, a box of warm glazed donuts for the office, or a comfortable table for afternoon conversation, our counter is ready.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-swan-dark/70 border border-white/10">
                  <Clock className="w-5 h-5 text-swan-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Opening Hours</div>
                    <div className="text-xs text-swan-sand/70 mt-0.5">Monday – Sunday: 7:00 AM – Midnight</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-swan-dark/70 border border-white/10">
                  <MapPin className="w-5 h-5 text-swan-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Location</div>
                    <div className="text-xs text-swan-sand/70 mt-0.5">{CAFE_INFO.address.street}, {CAFE_INFO.address.city}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-swan-dark/70 border border-white/10">
                  <Phone className="w-5 h-5 text-swan-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Direct Phone</div>
                    <div className="text-xs text-swan-sand/70 mt-0.5">{CAFE_INFO.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-swan-dark/70 border border-white/10">
                  <Coffee className="w-5 h-5 text-swan-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Counter Service</div>
                    <div className="text-xs text-swan-sand/70 mt-0.5">Dine-in, Takeaway & Online Orders</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigateToMenu()}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-swan-gold hover:bg-swan-amber text-swan-dark font-bold text-xs uppercase tracking-wider shadow-md transition-all text-center"
                >
                  Order Ahead Online
                </button>
                <a
                  href={`tel:${CAFE_INFO.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-swan-dark/90 hover:bg-swan-dark border border-swan-gold/40 text-swan-sand hover:text-white font-semibold text-xs tracking-wider transition-all text-center"
                >
                  Call Café
                </a>
              </div>
            </div>

            {/* Interior Photo */}
            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative overflow-hidden">
              <img
                src="/assets/images/cafe-interior.webp"
                alt="Swan Cafe Warm Boutique Interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-swan-espresso via-transparent to-transparent opacity-80" />
            </div>

          </div>
        </div>
      </section>

      </div>

    </div>
  );
};
