import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, ShoppingBag, Sparkles, Flame, Snowflake } from 'lucide-react';
import { MenuItem, SelectedModifier } from '../types';
import { useCart } from '../context/CartContext';

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

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onNavigateToProductPage?: (item: MenuItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifier[]>([]);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (item) {
      setQuantity(1);
      setInstructions('');
      
      // Auto-select defaults for required radio groups
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
    }
  }, [item]);

  if (!item) return null;

  const handleRadioChange = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionName: string,
    priceDelta: number
  ) => {
    setSelectedModifiers((prev) => {
      const filtered = prev.filter((m) => m.groupId !== groupId);
      return [
        ...filtered,
        { groupId, groupName, optionId, optionName, priceDelta },
      ];
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
          // Replace earliest selected option in this group or reject
          const filtered = prev.filter((m) => m.groupId !== groupId || m.optionId !== groupSelected[0].optionId);
          return [
            ...filtered,
            { groupId, groupName, optionId, optionName, priceDelta },
          ];
        }
        return [
          ...prev,
          { groupId, groupName, optionId, optionName, priceDelta },
        ];
      }
    });
  };

  const modifierTotal = selectedModifiers.reduce((sum, m) => sum + m.priceDelta, 0);
  const unitPrice = item.price + modifierTotal;
  const totalPrice = unitPrice * quantity;
  const temp = getItemTemperature(item);

  const handleAdd = () => {
    addToCart(item, quantity, selectedModifiers, instructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-swan-sand/30 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-swan-dark/70 hover:bg-swan-dark text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-52 sm:h-72 w-full overflow-hidden bg-gradient-to-b from-[#22160F] via-[#1B110A] to-[#140D08] flex-shrink-0 flex items-center justify-center p-4 sm:p-6">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-auto max-w-[85%] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {temp === 'hot' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 shadow-sm">
                  <Flame className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  Hot Brew
                </span>
              )}
              {temp === 'cold' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-950/90 text-sky-300 border border-sky-400/40 shadow-sm">
                  <Snowflake className="w-2.5 h-2.5 text-sky-300" />
                  Iced / Chilled
                </span>
              )}
              {item.badge && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-swan-gold text-swan-dark uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  {item.badge}
                </span>
              )}
              {item.isSignature && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-swan-pinkDeep text-white uppercase tracking-wider">
                  Signature Recipe
                </span>
              )}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow">
              {item.name}
            </h2>
            <div className="flex items-center gap-2.5 mt-1">
              <span className="line-through text-swan-sand/70 font-mono text-sm">
                PKR {item.originalPrice}
              </span>
              <span className="text-swan-amber font-mono font-extrabold text-xl">
                PKR {item.price}
              </span>
              <span className="bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                50% OFF Limited Offer
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-swan-dark">
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-swan-mocha mb-1">
              Description & Notes
            </h4>
            <p className="text-sm text-swan-cocoa leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Modifier Groups */}
          {item.modifierGroups && item.modifierGroups.length > 0 && (
            <div className="space-y-6 border-t border-swan-sand/30 pt-4">
              {item.modifierGroups.map((group) => {
                const groupSelected = selectedModifiers.filter((m) => m.groupId === group.id);

                return (
                  <div key={group.id} className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <label className="font-serif font-bold text-base text-swan-dark">
                        {group.name}
                      </label>
                      <span className="text-xs font-semibold text-swan-mocha">
                        {group.required ? (
                          <span className="text-swan-pinkDeep font-bold">* Required</span>
                        ) : group.maxSelections ? (
                          `Select up to ${group.maxSelections}`
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
                                : 'bg-swan-cream/60 border-swan-sand/50 hover:border-swan-gold/50 text-swan-cocoa'
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

          {/* Barista Special Instructions */}
          <div className="border-t border-swan-sand/30 pt-4">
            <label className="block text-xs uppercase font-bold tracking-wider text-swan-mocha mb-1.5">
              Special Instructions for Barista / Kitchen
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra hot, extra cinnamon on foam, light ice..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-swan-sand/60 focus:border-swan-gold focus:ring-1 focus:ring-swan-gold outline-none resize-none bg-swan-cream/40"
            />
          </div>
        </div>

        {/* Modal Bottom Footer with Total & CTA */}
        <div className="p-4 sm:p-6 bg-swan-cream border-t border-swan-sand/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-swan-mocha">
              Quantity:
            </span>
            <div className="flex items-center border border-swan-sand bg-white rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 hover:bg-swan-parchment transition-colors text-swan-cocoa"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-sm text-swan-dark font-mono">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 hover:bg-swan-parchment transition-colors text-swan-cocoa"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="w-full sm:w-auto flex-1 sm:flex-initial flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-swan-espresso to-swan-dark hover:from-swan-dark hover:to-swan-espresso text-white font-bold text-sm shadow-luxury active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-swan-amber" />
            <span>Add to Cart</span>
            <span className="w-1 h-1 rounded-full bg-swan-gold"></span>
            <span className="font-mono text-swan-amber">PKR {totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
