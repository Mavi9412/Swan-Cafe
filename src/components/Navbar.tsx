import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenProduct?: (productId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const { items, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About Us' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Visit Us' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'reviews') {
      // If on home, scroll to reviews, else navigate to home and scroll
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.getElementById('reviews-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('reviews-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActivePage(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#130A05]/85 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      {/* Top Slim Announcement Line */}
      <div className="bg-black/30 border-b border-white/[0.04] py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[11px] text-swan-sand/80">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-swan-gold animate-pulse" />
          <span>
            Always Fresh • <strong className="text-swan-amber font-semibold">50% OFF Season Sale</strong> Active on All Items (Voucher <code className="bg-white/10 px-1 py-0.5 rounded text-white font-mono font-bold">SWAN50</code>)
          </span>
        </div>
      </div>

      {/* Main Floating Pill Header (BRWW Reference Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* LEFT: Brand Logo & Typography */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none flex-shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-gradient-to-br from-[#2A180E] to-[#120804] border border-swan-gold/50 shadow-md p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src="/assets/images/logo-transparent.webp"
                alt="Swan Cafe Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-lg sm:text-xl tracking-[0.18em] uppercase text-white group-hover:text-swan-amber transition-colors leading-none">
                SWAN
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-swan-sand/60 font-semibold mt-0.5">
                Donuts & Cafe
              </span>
            </div>
          </button>

          {/* CENTER: Floating Capsule Pill Navigation (Exact Reference Match) */}
          <nav className="hidden md:flex items-center bg-[#1E130B]/90 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-2xl">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none ${
                    isActive
                      ? 'bg-white/15 text-white shadow-inner font-bold border border-white/10'
                      : 'text-swan-sand/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Action Icons & Pill CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* User Profile Simulation (Hidden on small mobile, visible on sm+) */}
            <button
              onClick={() => handleNavClick('about')}
              title="About Swan Cafe"
              className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-swan-gold/40 text-swan-sand/80 hover:text-white items-center justify-center transition-all"
              aria-label="User Account"
            >
              <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-swan-gold/40 text-swan-sand/80 hover:text-white flex items-center justify-center transition-all focus:outline-none"
              aria-label={`Cart with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-swan-amber" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-swan-pinkDeep text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center border border-[#130A05] shadow-sm animate-pulse-subtle">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Pill "Order Now" Button (BRWW Style Cream/Gold Capsule) */}
            <button
              onClick={() => handleNavClick('menu')}
              className="inline-flex items-center justify-center px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-[#E8DCC4] hover:bg-[#F3EAD8] text-[#1A1009] font-serif font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Order Now
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full bg-white/5 border border-white/10 text-swan-sand hover:text-white flex items-center justify-center focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-Down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#180E07]/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="bg-[#120803] p-1.5 rounded-2xl border border-white/10 space-y-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white/15 text-white font-bold border border-white/10'
                      : 'text-swan-sand/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => handleNavClick('menu')}
            className="w-full py-3 rounded-xl bg-[#E8DCC4] hover:bg-[#F3EAD8] text-[#1A1009] font-serif font-bold text-center text-sm shadow-md transition-all active:scale-95"
          >
            Order Now (50% Off Active)
          </button>
        </div>
      )}
    </header>
  );
};
