import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Minus, Check, ShoppingBag, Sparkles, Coffee, ShieldCheck } from 'lucide-react';
import { MenuItem, SelectedModifier } from '../types';
import { MENU_ITEMS } from '../data/menu';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  productId: string;
  onBackToMenu: () => void;
  onSelectProduct: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onBackToMenu,
  onSelectProduct,
  onQuickAdd,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifier[]>([]);
  const [instructions, setInstructions] = useState('');

  const item = MENU_ITEMS.find((i) => i.id === productId) || MENU_ITEMS[0];

  useEffect(() => {
    setQuantity(1);
    setInstructions('');
    const defaults: SelectedModifier[] = [];
    item.modifierGroups?.forEach((group) => {
      if (group.required && group.type === 'radio' && group.options.length > 0) {
        const firstOption = group.options[0];
        defaults.push({
          groupId: group.id,
          groupName: group.name,
          optionId: firstOption.id,
          optionName: firstOption.name,
          priceDelta: firstOption.priceDelta,
        });
      }
    });
    setSelectedModifiers(defaults);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [item]);

  const handleRadioChange = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionName: string,
    priceDelta: number
  ) => {
    setSelectedModifiers((prev) => {
      const filtered = prev.filter((m) => m.groupId !== groupId);
      return [...filtered, { groupId, groupName, optionId, optionName, priceDelta }];
    });
  };

  const handleCheckboxChange = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionName: string,
    priceDelta: number,
    maxSelections?: number
  ) => {
    setSelectedModifiers((prev) => {
      const exists = prev.some((m) => m.groupId === groupId && m.optionId === optionId);
      if (exists) {
        return prev.filter((m) => !(m.groupId === groupId && m.optionId === optionId));
      } else {
        const groupSelected = prev.filter((m) => m.groupId === groupId);
        if (maxSelections && groupSelected.length >= maxSelections) {
          const filtered = prev.filter((m) => m.groupId !== groupId || m.optionId !== groupSelected[0].optionId);
          return [...filtered, { groupId, groupName, optionId, optionName, priceDelta }];
        }
        return [...prev, { groupId, groupName, optionId, optionName, priceDelta }];
      }
    });
  };

  const modifierTotal = selectedModifiers.reduce((sum, m) => sum + m.priceDelta, 0);
  const unitPrice = item.price + modifierTotal;
  const totalPrice = unitPrice * quantity;

  // Suggested pairings from menu
  const relatedItems = MENU_ITEMS.filter((i) => i.id !== item.id && (i.category === item.category || i.popular)).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Back button */}
      <button
        onClick={onBackToMenu}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-swan-mocha hover:text-swan-dark transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Full Menu</span>
      </button>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Gallery & Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-b from-[#22160F] via-[#1B110A] to-[#140D08] border border-swan-gold/30 shadow-luxury flex items-center justify-center p-8">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-500 ease-out"
            />
            {item.badge && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-swan-dark/90 text-swan-amber font-bold text-xs uppercase tracking-wider border border-swan-gold/40 shadow-lg backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-swan-gold" />
                  {item.badge}
                </span>
              </div>
            )}
          </div>

          {/* Value highlights */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-white rounded-2xl border border-swan-sand/50 text-center">
              <Sparkles className="w-4 h-4 mx-auto text-swan-gold mb-1" />
              <div className="text-[11px] font-bold text-swan-dark">Artisan Recipe</div>
              <div className="text-[9px] text-swan-sand/90 text-swan-cocoa">Handcrafted daily</div>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-swan-sand/50 text-center">
              <Coffee className="w-4 h-4 mx-auto text-swan-caramel mb-1" />
              <div className="text-[11px] font-bold text-swan-dark">Premium Grade</div>
              <div className="text-[9px] text-swan-sand/90 text-swan-cocoa">Natural ingredients</div>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-swan-sand/50 text-center">
              <ShieldCheck className="w-4 h-4 mx-auto text-swan-pinkDeep mb-1" />
              <div className="text-[11px] font-bold text-swan-dark">Freshness Guarantee</div>
              <div className="text-[9px] text-swan-sand/90 text-swan-cocoa">Served hot or chilled</div>
            </div>
          </div>
        </div>

        {/* Right: Customization & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-swan-caramel">
              Swan Cafe Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-swan-dark mt-1">
              {item.name}
            </h1>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="line-through font-mono text-xl text-gray-400">
                PKR {item.originalPrice}
              </span>
              <span className="font-mono text-3xl font-extrabold text-swan-caramel">
                PKR {item.price}
              </span>
              <span className="text-xs font-extrabold text-red-600 bg-red-100 border border-red-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                50% OFF Applied
              </span>
            </div>
            <div className="text-xs text-swan-cocoa/70 mt-1">
              Inclusive of all local culinary taxes • Half price special
            </div>
          </div>

          <p className="text-sm sm:text-base text-swan-cocoa leading-relaxed border-t border-b border-swan-sand/40 py-4">
            {item.description}
          </p>

          {/* Modifier Groups */}
          {item.modifierGroups && item.modifierGroups.length > 0 && (
            <div className="space-y-6">
              {item.modifierGroups.map((group) => {
                const groupSelected = selectedModifiers.filter((m) => m.groupId === group.id);

                return (
                  <div key={group.id} className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <label className="font-serif font-bold text-sm text-swan-dark">
                        {group.name}
                      </label>
                      <span className="text-xs text-swan-mocha">
                        {group.required ? (
                          <span className="text-swan-pinkDeep font-bold">* Required</span>
                        ) : (
                          'Optional'
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {group.options.map((option) => {
                        const isSelected = groupSelected.some((m) => m.optionId === option.id);

                        return (
                          <button
                            type="button"
                            key={option.id}
                            onClick={() => {
                              if (group.type === 'radio') {
                                handleRadioChange(group.id, group.name, option.id, option.name, option.priceDelta);
                              } else {
                                handleCheckboxChange(
                                  group.id,
                                  group.name,
                                  option.id,
                                  option.name,
                                  option.priceDelta,
                                  group.maxSelections
                                );
                              }
                            }}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                              isSelected
                                ? 'bg-swan-pinkLight/60 border-swan-pinkDeep font-bold text-swan-dark shadow-sm'
                                : 'bg-swan-cream/50 border-swan-sand/50 hover:border-swan-gold/50 text-swan-cocoa'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                                  isSelected
                                    ? 'bg-swan-pinkDeep border-swan-pinkDeep text-white'
                                    : 'border-swan-sand bg-white'
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                              <span>{option.name}</span>
                            </div>
                            {option.priceDelta > 0 && (
                              <span className="font-mono text-swan-mocha font-bold">
                                +PKR {option.priceDelta}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Barista Instructions */}
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-swan-mocha mb-1.5">
              Special Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra hot, light foam, separate container..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none resize-none bg-swan-cream/30"
            />
          </div>

          {/* Quantity & Add to Cart Action */}
          <div className="p-6 bg-swan-parchment/60 rounded-3xl border border-swan-sand/50 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-swan-mocha">
                Quantity:
              </span>
              <div className="flex items-center border border-swan-sand bg-white rounded-xl shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-swan-parchment text-swan-dark"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm font-mono text-swan-dark">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-swan-parchment text-swan-dark"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                addToCart(item, quantity, selectedModifiers, instructions);
              }}
              className="flex-1 w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-swan-gold to-swan-amber hover:from-swan-amber hover:to-swan-gold text-swan-dark font-extrabold text-sm uppercase tracking-wider shadow-glow-gold hover:shadow-lg transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
              <span className="w-1.5 h-1.5 rounded-full bg-swan-dark"></span>
              <span className="font-mono">PKR {totalPrice}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Suggested Pairings */}
      {relatedItems.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-swan-sand/40">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-swan-caramel">
                Perfect Companions
              </span>
              <h3 className="font-serif text-2xl font-bold text-swan-dark">
                Frequently Paired With
              </h3>
            </div>
            <button
              onClick={onBackToMenu}
              className="text-xs font-bold text-swan-mocha hover:underline"
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedItems.map((rel) => (
              <ProductCard
                key={rel.id}
                item={rel}
                onSelect={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
