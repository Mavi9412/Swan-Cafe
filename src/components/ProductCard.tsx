import React from 'react';
import { Plus, SlidersHorizontal, Sparkles, Flame, Snowflake } from 'lucide-react';
import { MenuItem } from '../types';

interface ProductCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

const getItemTemperature = (item: MenuItem): 'hot' | 'cold' | null => {
  const nameLower = item.name.toLowerCase();
  if (item.category === 'hot-coffee-tea') return 'hot';
  if (
    item.category === 'cold-coffee' ||
    item.category === 'milkshake' ||
    item.category === 'fresh-juice' ||
    item.category === 'ice-cream'
  ) {
    return 'cold';
  }
  if (nameLower.includes('iced') || nameLower.includes('cold') || nameLower.includes('shake') || nameLower.includes('frappe')) {
    return 'cold';
  }
  if (nameLower.includes('hot') || nameLower.includes('tea') || nameLower.includes('cappuccino') || nameLower.includes('espresso') || nameLower.includes('gahwa')) {
    return 'hot';
  }
  return null;
};

export const ProductCard: React.FC<ProductCardProps> = ({ item, onSelect, onQuickAdd }) => {
  const hasRequiredModifiers = item.modifierGroups?.some((g) => g.required) || false;
  const temp = getItemTemperature(item);

  return (
    <div className="group relative rounded-3xl bg-[#1C120B]/95 backdrop-blur-md border border-swan-gold/25 shadow-2xl p-5 sm:p-6 pt-0 flex flex-col justify-between hover:border-swan-gold/60 transition-all duration-500 text-white">
      
      {/* Top Left Discount & Special Badges */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 flex-wrap max-w-[65%]">
        <span className="bg-red-950/90 text-red-300 border border-red-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
          -50%
        </span>

        {/* Hot / Cold Beverage Indicator */}
        {temp === 'hot' && (
          <span className="bg-amber-950/90 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
            <Flame className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
            Hot
          </span>
        )}
        {temp === 'cold' && (
          <span className="bg-sky-950/90 text-sky-300 border border-sky-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
            <Snowflake className="w-2.5 h-2.5 text-sky-300" />
            Cold
          </span>
        )}

        {item.isSignature && (
          <span className="bg-black/60 border border-swan-gold/40 text-swan-amber text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md backdrop-blur-sm hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-swan-gold" />
            Signature
          </span>
        )}
      </div>

      {/* Top Right Rating Pill */}
      <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md border border-swan-gold/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-swan-sand flex items-center gap-1 shadow-md">
        <span>4.9</span>
        <span className="text-swan-gold">★</span>
      </div>

      {/* 3D Floating Pop-Out Product (Physically extending above the card!) */}
      <div
        className="relative -mt-16 sm:-mt-20 mb-4 flex justify-center items-center z-20 h-44 sm:h-52 cursor-pointer"
        onClick={() => onSelect(item)}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="max-h-full w-auto max-w-[90%] object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] group-hover:-translate-y-3 group-hover:scale-110 transition-all duration-500 ease-out"
        />
      </div>

      {/* Content Details */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3
            onClick={() => onSelect(item)}
            className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-swan-amber transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {item.name}
          </h3>
        </div>

        <p className="text-xs text-swan-sand/70 line-clamp-2 leading-relaxed min-h-[32px]">
          {item.description}
        </p>

        {/* Pricing & Actions Row */}
        <div className="pt-3 border-t border-swan-gold/15 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="line-through text-xs font-mono text-swan-sand/50">
              PKR {item.originalPrice}
            </span>
            <span className="font-mono font-bold text-base sm:text-lg text-swan-amber">
              PKR {item.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(item)}
              className="text-[11px] font-semibold text-swan-sand/80 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5"
            >
              <SlidersHorizontal className="w-3 h-3 text-swan-gold" />
              <span className="hidden sm:inline">Customize</span>
            </button>

            {hasRequiredModifiers ? (
              <button
                onClick={() => onSelect(item)}
                className="w-9 h-9 rounded-full bg-swan-gold hover:bg-swan-amber text-swan-dark font-extrabold flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
                title={`Customize ${item.name}`}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            ) : (
              <button
                onClick={() => onQuickAdd(item)}
                className="w-9 h-9 rounded-full bg-swan-gold hover:bg-swan-amber text-swan-dark font-extrabold flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
                title={`Add ${item.name} to order`}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
