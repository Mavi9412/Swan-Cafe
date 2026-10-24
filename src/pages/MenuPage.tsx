import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Filter, X, Flame, Snowflake } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import { ProductCard } from '../components/ProductCard';

interface MenuPageProps {
  initialCategoryId?: string;
  onSelectProduct: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  initialCategoryId = 'all',
  onSelectProduct,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSignatureOnly, setFilterSignatureOnly] = useState<boolean>(false);
  const [filterPopularOnly, setFilterPopularOnly] = useState<boolean>(false);
  const [temperatureFilter, setTemperatureFilter] = useState<'all' | 'hot' | 'cold'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesBadge = item.badge?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesDesc && !matchesBadge) return false;
      }

      // Temperature filter (Hot / Cold)
      if (temperatureFilter === 'hot') {
        const isHot = item.category === 'hot-coffee-tea' || item.name.toLowerCase().includes('hot');
        if (!isHot) return false;
      }
      if (temperatureFilter === 'cold') {
        const isCold =
          item.category === 'cold-coffee' ||
          item.category === 'milkshake' ||
          item.category === 'fresh-juice' ||
          item.category === 'ice-cream' ||
          item.name.toLowerCase().includes('iced') ||
          item.name.toLowerCase().includes('cold');
        if (!isCold) return false;
      }

      // Quick tags
      if (filterSignatureOnly && !item.isSignature) return false;
      if (filterPopularOnly && !item.popular) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, searchQuery, filterSignatureOnly, filterPopularOnly, temperatureFilter, sortBy]);

  const activeCategoryInfo = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#130A05] via-[#1A0F08] to-[#100804] pb-32 text-white">
      
      {/* Category Hero Header Banner */}
      <div className="bg-gradient-to-r from-[#1A0E08] via-[#24130A] to-[#120A05] text-white relative overflow-hidden py-14 px-4 sm:px-6 lg:px-8 border-b border-swan-gold/20 shadow-md">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-swan-amber block">
              Artisan Menu & Counter Ordering
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              {activeCategoryInfo ? activeCategoryInfo.name : 'Complete Café Menu'}
            </h1>
            <p className="text-sm sm:text-base text-swan-sand/80 leading-relaxed">
              {activeCategoryInfo
                ? activeCategoryInfo.tagline
                : 'Freshly prepared donuts, hand-pulled espresso, specialty teas, artisan shakes, and churned ice cream.'}
            </p>
          </div>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 bg-swan-gold/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Controls Bar: Search & Category Navigation */}
        <div className="bg-[#1C120B]/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-2xl border border-swan-gold/25 space-y-6 text-white">
          
          {/* Top row: Search input & sort */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-swan-sand/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, donuts, shake flavors..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#140C07] border border-swan-gold/30 focus:border-swan-gold focus:ring-2 focus:ring-swan-gold/20 outline-none text-sm text-white font-medium placeholder:text-swan-sand/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-swan-sand/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Badges & Sort */}
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
              {/* Hot & Cold Quick Toggles */}
              <button
                onClick={() => setTemperatureFilter(temperatureFilter === 'hot' ? 'all' : 'hot')}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  temperatureFilter === 'hot'
                    ? 'bg-amber-500 text-swan-dark shadow-sm font-extrabold'
                    : 'bg-[#140C07] text-swan-sand/80 border border-swan-gold/25 hover:border-swan-gold'
                }`}
                title="Filter Hot Coffees & Teas"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Hot
              </button>

              <button
                onClick={() => setTemperatureFilter(temperatureFilter === 'cold' ? 'all' : 'cold')}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  temperatureFilter === 'cold'
                    ? 'bg-sky-400 text-swan-dark shadow-sm font-extrabold'
                    : 'bg-[#140C07] text-swan-sand/80 border border-swan-gold/25 hover:border-swan-gold'
                }`}
                title="Filter Cold Brews, Iced Lattes & Shakes"
              >
                <Snowflake className="w-3.5 h-3.5 text-sky-300" />
                Cold
              </button>

              <button
                onClick={() => setFilterSignatureOnly(!filterSignatureOnly)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  filterSignatureOnly
                    ? 'bg-swan-pinkDeep text-white shadow-sm'
                    : 'bg-[#140C07] text-swan-sand/80 border border-swan-gold/25 hover:border-swan-gold'
                }`}
              >
                Signatures
              </button>

              <button
                onClick={() => setFilterPopularOnly(!filterPopularOnly)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  filterPopularOnly
                    ? 'bg-swan-gold text-swan-dark shadow-sm'
                    : 'bg-[#140C07] text-swan-sand/80 border border-swan-gold/25 hover:border-swan-gold'
                }`}
              >
                Popular
              </button>

              <div className="flex items-center gap-1.5 bg-[#140C07] border border-swan-gold/25 rounded-xl px-3 py-2 text-white">
                <SlidersHorizontal className="w-3.5 h-3.5 text-swan-gold" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-swan-sand outline-none cursor-pointer [&>option]:bg-[#1C120B] [&>option]:text-white"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Tabs (Scrollbar Hidden Cross-Browser) */}
          <div 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex items-center gap-2 overflow-x-auto pb-1 pt-3 border-t border-swan-gold/15 [&::-webkit-scrollbar]:hidden -mx-2 px-2 sm:mx-0 sm:px-0"
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex-shrink-0 transition-all ${
                selectedCategory === 'all'
                  ? 'bg-swan-gold text-swan-dark font-extrabold shadow-glow-gold'
                  : 'bg-[#140C07] text-swan-sand/80 hover:bg-white/5 border border-swan-gold/20'
              }`}
            >
              All Categories ({MENU_ITEMS.length})
            </button>

            {CATEGORIES.map((cat) => {
              const catCount = MENU_ITEMS.filter((item) => item.category === cat.id).length;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex-shrink-0 transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-swan-gold text-swan-dark font-extrabold shadow-glow-gold'
                      : 'bg-[#140C07] text-swan-sand/80 hover:bg-white/5 border border-swan-gold/20'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-swan-dark text-white' : 'bg-swan-sand/20 text-swan-sand'
                    }`}
                  >
                    {catCount}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter */}
        <div className="mt-8 flex justify-between items-center text-xs text-swan-sand/70 font-medium px-2">
          <span>
            Showing <strong className="text-swan-amber font-bold">{filteredItems.length}</strong> items
            {selectedCategory !== 'all' && ` in ${activeCategoryInfo?.name}`}
          </span>
          {(filterSignatureOnly || filterPopularOnly || searchQuery) && (
            <button
              onClick={() => {
                setFilterSignatureOnly(false);
                setFilterPopularOnly(false);
                setSearchQuery('');
              }}
              className="text-swan-amber hover:underline font-bold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Product Grid with Pop-Out 3D Floating Spacing */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#1C120B]/90 rounded-3xl p-16 text-center my-8 border border-swan-gold/25 shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-swan-gold/10 mx-auto flex items-center justify-center text-swan-amber">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-white">No matching items found</h3>
            <p className="text-xs text-swan-sand/70 max-w-sm mx-auto">
              We couldn't find any menu items matching "{searchQuery}". Try searching for coffee, latte, or donut.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setFilterSignatureOnly(false);
                setFilterPopularOnly(false);
              }}
              className="px-6 py-2.5 rounded-full bg-swan-gold text-swan-dark text-xs font-bold uppercase tracking-wider shadow-md hover:bg-swan-amber transition-all"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-28 pt-20 mt-6">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onSelect={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
