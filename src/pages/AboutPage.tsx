import React from 'react';
import { Sparkles, Heart, Coffee, Clock, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateToMenu: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToMenu }) => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-[#140C07] via-[#1B1009] to-[#120803] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-swan-gold/30">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-swan-dark/70 border border-swan-gold/40 text-xs font-semibold text-swan-amber">
            <Sparkles className="w-3.5 h-3.5" /> Our Story & Heritage
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight">
            The Swan Cafe Story
          </h1>
          <p className="text-base sm:text-lg text-swan-sand/80 max-w-2xl mx-auto leading-relaxed">
            Where old-world European coffee house elegance meets the whimsical joy of warm, artisan-glazed donuts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Brand Emblem Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-[#2A180E] via-[#1C1008] to-[#120804] border-4 border-swan-gold/60 p-5 sm:p-8 shadow-2xl flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-swan-gold/15 rounded-full blur-2xl pointer-events-none" />
              <img
                src="/assets/images/logo-transparent.png"
                alt="Swan Cafe Emblem"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-swan-caramel">
              Visual Identity & Symbolism
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-swan-dark leading-tight">
              A Crowned Swan Holding Sweet Indulgence
            </h2>
            <p className="text-sm sm:text-base text-swan-cocoa leading-relaxed">
              Our emblem was designed to capture the core essence of our café experience. The regal swan symbolizes purity, grace, and meticulous attention to detail in every recipe we craft.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-swan-sand/60 shadow-sm">
                <div className="font-serif font-bold text-base text-swan-dark text-swan-pinkDeep mb-1">
                  The Pink Donut
                </div>
                <p className="text-xs text-swan-cocoa/80 leading-relaxed">
                  Cradled in the swan's wing, representing handcrafted sweetness and childlike wonder.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-swan-sand/60 shadow-sm">
                <div className="font-serif font-bold text-base text-swan-dark text-swan-caramel mb-1">
                  The Steaming Cup
                </div>
                <p className="text-xs text-swan-cocoa/80 leading-relaxed">
                  Steeping tradition, aroma, and the warmth of genuine community gathering.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-swan-sand/60 shadow-sm">
                <div className="font-serif font-bold text-base text-swan-dark text-swan-amber mb-1">
                  The Golden Crown
                </div>
                <p className="text-xs text-swan-cocoa/80 leading-relaxed">
                  Our royal standard of quality, selecting only Grade-A beans and natural fruit glazes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars of Quality */}
        <div className="bg-swan-parchment/60 rounded-3xl p-8 sm:p-12 border border-swan-sand/40 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-swan-caramel">
              Our Non-Negotiable Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-swan-dark">
              Good Food ✨ Good Mood
            </h2>
            <p className="text-sm text-swan-cocoa/80">
              We believe great days begin with mindful rituals and pure ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-swan-sand/50 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-swan-espresso text-swan-amber flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-swan-dark">Triple Daily Bake</h3>
              <p className="text-xs text-swan-cocoa leading-relaxed">
                We never sell yesterday's donuts. Fresh batches drop at 7:30 AM, 12:30 PM, and 5:30 PM so you always bite into warm, pillow-soft dough.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-swan-sand/50 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-swan-espresso text-swan-gold flex items-center justify-center">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-swan-dark">Signature Brew Mastery</h3>
              <p className="text-xs text-swan-cocoa leading-relaxed">
                From micro-textured swan latte art to slow-simmered Turkish cezve coffee and rich Spanish condensed milk layers, our baristas are true artisans.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-swan-sand/50 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-swan-espresso text-swan-pinkDeep flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-swan-dark">Wholesome Hospitality</h3>
              <p className="text-xs text-swan-cocoa leading-relaxed">
                Whether you drop in for a quick morning takeaway or linger over an afternoon date shake, our space is an uplifting sanctuary designed for connection.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-swan-caramel">
              Visual Craftsmanship
            </span>
            <h2 className="font-serif text-3xl font-bold text-swan-dark">
              A Glimpse Into Our Kitchen
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-square border border-swan-sand shadow-sm">
              <img
                src="/assets/images/cappuccino.jpg"
                alt="Latte Art"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square border border-swan-sand shadow-sm">
              <img
                src="/assets/images/pink-glazed-donut.jpg"
                alt="Pink Donut"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square border border-swan-sand shadow-sm">
              <img
                src="/assets/images/iced-spanish-latte.jpg"
                alt="Iced Spanish Latte"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square border border-swan-sand shadow-sm">
              <img
                src="/assets/images/date-shake.jpg"
                alt="Medjool Date Shake"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center py-8">
          <button
            onClick={onNavigateToMenu}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-swan-gold hover:bg-swan-amber text-swan-dark font-extrabold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore the Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
