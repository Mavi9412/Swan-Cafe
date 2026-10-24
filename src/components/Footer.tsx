import React from 'react';
import { MapPin, Clock, Phone, Mail, Heart } from 'lucide-react';
import { CAFE_INFO } from '../data/config';
import { PoweredByMavi } from './PoweredByMavi';

interface FooterProps {
  setActivePage: (page: string) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onSelectCategory }) => {
  return (
    <footer className="bg-swan-dark text-swan-sand border-t border-swan-gold/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-swan-gold/50 bg-gradient-to-br from-[#2A180E] to-[#120804] p-1.5 flex items-center justify-center">
                <img
                  src="/assets/images/logo-transparent.png"
                  alt="Swan Cafe Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-script text-3xl font-bold text-swan-amber block leading-tight">
                  Swan
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-swan-sand/80">
                  Donuts & Cafe
                </span>
              </div>
            </div>
            <p className="text-sm text-swan-sand/70 leading-relaxed">
              Crafting golden moments daily. Freshly fried artisan donuts, micro-lot specialty coffees, rich velvety milkshakes, and cold-pressed botanical juices.
            </p>
            <div className="inline-flex items-center text-xs font-semibold text-swan-gold bg-swan-espresso/80 px-3 py-1.5 rounded-full border border-swan-gold/30">
              Good Food • Good Mood
            </div>
            
            {/* Social Icons SVG */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-swan-espresso flex items-center justify-center text-swan-sand hover:text-swan-amber hover:bg-swan-chocolate transition-colors border border-swan-gold/20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-swan-espresso flex items-center justify-center text-swan-sand hover:text-swan-amber hover:bg-swan-chocolate transition-colors border border-swan-gold/20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div>
            <h4 className="text-white font-serif text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-swan-gold"></span>
              Menu Highlights
            </h4>
            <ul className="space-y-2 text-sm text-swan-sand/80">
              <li>
                <button
                  onClick={() => {
                    setActivePage('menu');
                    onSelectCategory?.('donut-sweets');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-swan-amber transition-colors"
                >
                  Pink Glazed Signature Donut
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('menu');
                    onSelectCategory?.('hot-coffee-tea');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-swan-amber transition-colors"
                >
                  Swan Art Cappuccino & Latte
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('menu');
                    onSelectCategory?.('cold-coffee');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-swan-amber transition-colors"
                >
                  Iced Spanish & Matcha Latte
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('menu');
                    onSelectCategory?.('milkshake');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-swan-amber transition-colors"
                >
                  Medjool Date & Oreo Shakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('menu');
                    onSelectCategory?.('fresh-juice');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-swan-amber transition-colors"
                >
                  Cold-Pressed Pomegranate & Mint Margarita
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('menu');
                    onSelectCategory?.('ice-cream');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-swan-amber transition-colors"
                >
                  Artisan Ice Cream & Jumbo Box
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-white font-serif text-lg font-bold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-swan-amber" />
              Opening Hours
            </h4>
            <div className="space-y-3 text-sm text-swan-sand/80">
              <div className="flex justify-between border-b border-swan-cocoa/40 pb-2">
                <span>Saturday – Thursday</span>
                <span className="font-semibold text-white">7:00 AM – 12:00 AM</span>
              </div>
              <div className="flex justify-between border-b border-swan-cocoa/40 pb-2">
                <span>Friday</span>
                <span className="font-semibold text-swan-amber">8:00 AM – 1:00 AM</span>
              </div>
              <div className="pt-2 text-xs text-swan-sand/60">
                Fresh donut batches are glazed hot at 7:30 AM, 12:30 PM, and 5:30 PM daily.
              </div>
            </div>
          </div>

          {/* Location & Ordering */}
          <div>
            <h4 className="text-white font-serif text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-swan-amber" />
              Visit & Contact
            </h4>
            <ul className="space-y-3 text-sm text-swan-sand/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-swan-amber flex-shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address.full}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-swan-amber flex-shrink-0" />
                <span>{CAFE_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-swan-amber flex-shrink-0" />
                <span>{CAFE_INFO.ordersEmail}</span>
              </li>
              <li className="pt-2">
                <div className="p-3 bg-swan-espresso rounded-lg border border-swan-gold/30 text-xs">
                  <div className="font-semibold text-swan-amber mb-1">Pick-up Available</div>
                  <div>Place an online order for contactless counter collection within 15 minutes.</div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-swan-cocoa/40 pt-8 pb-2 flex flex-col md:flex-row items-center justify-between text-xs text-swan-sand/60 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Swan Cafe — Coffee & Donut. All rights reserved.</p>
            <span className="hidden sm:inline opacity-30">•</span>
            <div className="flex items-center gap-1 text-swan-sand/80">
              Made with <Heart className="w-3.5 h-3.5 text-swan-pink fill-swan-pink" /> for Swan Lovers
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActivePage('about')} className="hover:text-white transition-colors">
              Brand Story
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('menu')} className="hover:text-white transition-colors">
              Online Ordering
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">
              Customer Support
            </button>
          </div>

          <div className="flex items-center">
            <PoweredByMavi variant="pill" />
          </div>
        </div>
      </div>
    </footer>
  );
};
