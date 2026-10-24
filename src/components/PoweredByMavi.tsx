import React from 'react';

interface PoweredByMaviProps {
  className?: string;
  variant?: 'pill' | 'inline' | 'card';
  light?: boolean;
}

/**
 * Official "Powered by Mavi Tech POS" brand badge
 * Redirects to https://mavipos.tech with the official Mavi POS logo.
 */
export const PoweredByMavi: React.FC<PoweredByMaviProps> = ({
  className = '',
  variant = 'pill',
  light = false,
}) => {
  if (variant === 'pill') {
    return (
      <a
        href="https://mavipos.tech"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Powered by Mavi Tech POS (mavipos.tech)"
        className={`group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 shadow-sm hover:shadow-md ${
          light
            ? 'bg-white/80 hover:bg-white border-swan-cocoa/20 text-gray-700 hover:border-swan-gold/50'
            : 'bg-[#140C07]/80 hover:bg-[#1E130B] border-swan-gold/25 hover:border-swan-gold/60 text-swan-sand/80 hover:text-white'
        } ${className}`}
        title="Powered by Mavi Tech POS — Restaurant Management & Cloud POS"
      >
        <span className="text-[11px] font-medium tracking-wide">Powered by</span>
        <div className="flex items-center gap-1.5">
          <img
            src="/assets/images/mavitech-logo.png"
            onError={(e) => {
              // fallback if nested path fails
              (e.target as HTMLImageElement).src = '/mavitech-logo.png';
            }}
            alt="Mavi Tech POS"
            className="h-4.5 max-h-[18px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 rounded-[3px]"
          />
          <span className="text-xs font-bold tracking-tight text-white group-hover:text-swan-amber transition-colors">
            Mavi Tech POS
          </span>
        </div>
        <span className="text-[10px] opacity-70 group-hover:opacity-100 text-swan-amber transition-opacity">
          mavipos.tech ↗
        </span>
      </a>
    );
  }

  return (
    <a
      href="https://mavipos.tech"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Powered by Mavi Tech POS (mavipos.tech)"
      className={`inline-flex items-center gap-2 transition-all duration-300 hover:opacity-100 group ${className}`}
      title="Powered by Mavi Tech POS — Restaurant Management & Cloud POS"
    >
      <span className={`text-xs ${light ? 'text-gray-500' : 'text-swan-sand/70'}`}>
        Powered by
      </span>
      <img
        src="/assets/images/mavitech-logo.png"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/mavitech-logo.png';
        }}
        alt="Mavi Tech POS"
        className="h-4 max-h-[16px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 rounded-[3px]"
      />
      <span
        className={`text-xs font-bold transition-colors ${
          light ? 'text-gray-900 group-hover:text-amber-600' : 'text-white group-hover:text-swan-amber'
        }`}
      >
        Mavi Tech POS
      </span>
      <span
        className={`text-[10px] ${
          light ? 'text-gray-400' : 'text-swan-sand/50 group-hover:text-swan-amber'
        }`}
      >
        (mavipos.tech)
      </span>
    </a>
  );
};

export default PoweredByMavi;
