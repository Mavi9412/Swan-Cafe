import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PoweredByMavi } from './PoweredByMavi';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onExploreMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateToCheckout, onExploreMenu }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    discountCode,
    applyPromoCode,
    removePromoCode,
    deliveryFee,
    total,
    orderType,
    setOrderType,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    setPromoMessage({ success: result.success, text: result.message });
    if (result.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-swan-sand/30">
          
          {/* Header */}
          <div className="p-5 bg-swan-espresso text-white flex items-center justify-between border-b border-swan-gold/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-swan-chocolate rounded-xl border border-swan-gold/30">
                <ShoppingBag className="w-5 h-5 text-swan-amber" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg leading-tight">Your Order</h3>
                <span className="text-xs text-swan-sand/70">
                  {items.length === 0 ? 'Cart is empty' : `${items.length} unique item${items.length > 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-swan-chocolate text-swan-sand hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Order Fulfillment Type Pills */}
            <div className="bg-swan-parchment/60 p-1 rounded-2xl flex gap-1 border border-swan-sand/50 text-xs font-bold">
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  orderType === 'pickup'
                    ? 'bg-swan-espresso text-white shadow-sm'
                    : 'text-swan-mocha hover:text-swan-dark'
                }`}
              >
                Store Pickup
              </button>
              <button
                type="button"
                onClick={() => setOrderType('dine-in')}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  orderType === 'dine-in'
                    ? 'bg-swan-espresso text-white shadow-sm'
                    : 'text-swan-mocha hover:text-swan-dark'
                }`}
              >
                Dine-In
              </button>
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  orderType === 'delivery'
                    ? 'bg-swan-espresso text-white shadow-sm'
                    : 'text-swan-mocha hover:text-swan-dark'
                }`}
              >
                Delivery (+50)
              </button>
            </div>

            {/* Cart Items List */}
            {items.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-swan-pinkLight flex items-center justify-center text-swan-pinkDeep">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-swan-dark">Your basket is hungry!</h4>
                  <p className="text-xs text-swan-cocoa/70 mt-1 max-w-xs mx-auto">
                    Treat yourself to a fresh warm Pink Glazed donut or a Swan Art Cappuccino.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExploreMenu();
                  }}
                  className="px-6 py-2.5 rounded-full bg-swan-espresso text-white font-bold text-xs uppercase tracking-wider hover:bg-swan-dark shadow-sm"
                >
                  Explore Our Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="p-3.5 rounded-2xl bg-swan-cream/50 border border-swan-sand/40 flex gap-3.5 items-start hover:border-swan-gold/40 transition-colors"
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={cartItem.menuItem.image}
                      alt={cartItem.menuItem.name}
                      className="w-16 h-16 rounded-xl object-cover bg-swan-parchment flex-shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-sm text-swan-dark truncate pr-2">
                          {cartItem.menuItem.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(cartItem.cartItemId)}
                          className="text-swan-mocha/50 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected Modifiers Pills */}
                      {cartItem.selectedModifiers.length > 0 && (
                        <div className="flex flex-wrap gap-1 my-1.5">
                          {cartItem.selectedModifiers.map((mod, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-white border border-swan-sand/60 px-2 py-0.5 rounded-md text-swan-mocha"
                            >
                              {mod.optionName}
                              {mod.priceDelta > 0 && ` (+${mod.priceDelta})`}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Special Instructions Note */}
                      {cartItem.specialInstructions && (
                        <p className="text-[10px] text-swan-cocoa italic mb-2">
                          "{cartItem.specialInstructions}"
                        </p>
                      )}

                      {/* Stepper & Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-swan-sand/30">
                        <div className="flex items-center border border-swan-sand bg-white rounded-lg">
                          <button
                            onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                            className="p-1 hover:bg-swan-parchment text-swan-dark"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold font-mono text-swan-dark">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                            className="p-1 hover:bg-swan-parchment text-swan-dark"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="line-through text-[11px] text-gray-400 font-mono block">
                            PKR {(cartItem.menuItem.originalPrice || cartItem.menuItem.price * 2) * cartItem.quantity}
                          </span>
                          <span className="font-mono font-bold text-xs text-swan-dark flex items-center gap-1 justify-end">
                            <span>PKR {cartItem.totalPrice}</span>
                            <span className="text-[9px] text-red-600 bg-red-50 border border-red-200 px-1 rounded font-bold">-50%</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Promo Code Box */}
            {items.length > 0 && (
              <div className="border-t border-swan-sand/40 pt-4">
                {discountCode ? (
                  <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          <span className="font-mono bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded border border-emerald-300">
                            {discountCode}
                          </span>
                          <span>Already Applied</span>
                        </div>
                        <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">
                          50% season discount active on all items
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-[11px] font-semibold text-gray-500 hover:text-red-600 transition-colors ml-2"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-swan-mocha flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-swan-gold" /> Promo Code
                      </span>
                      <span className="text-[10px] text-swan-amber font-mono font-semibold">
                        Hint: SWAN50
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Enter SWAN50"
                        className="flex-1 uppercase font-mono text-xs px-3 py-2 rounded-xl border border-swan-sand focus:border-swan-gold outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-swan-espresso hover:bg-swan-dark text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <div
                        className={`text-xs flex items-center gap-1 mt-1 ${
                          promoMessage.success ? 'text-green-700' : 'text-red-600'
                        }`}
                      >
                        {promoMessage.success ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                        {promoMessage.text}
                      </div>
                    )}
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-5 bg-swan-cream border-t border-swan-sand/40 space-y-3">
              <div className="space-y-1.5 text-xs text-swan-cocoa">
                <div className="flex justify-between">
                  <span>Regular Total</span>
                  <span className="font-mono text-gray-400 line-through">PKR {subtotal * 2}</span>
                </div>
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>50% Menu Discount Applied</span>
                  <span className="font-mono">-PKR {subtotal}</span>
                </div>
                <div className="flex justify-between font-bold text-swan-dark pt-1 border-t border-swan-sand/30">
                  <span>Subtotal</span>
                  <span className="font-mono text-swan-dark">PKR {subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Extra Voucher ({discountCode})</span>
                    <span className="font-mono">-PKR {discount}</span>
                  </div>
                )}
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-mono font-bold text-swan-dark">PKR {deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif font-bold text-swan-dark pt-2 border-t border-swan-sand/30">
                  <span>Estimated Total</span>
                  <span className="font-mono text-swan-caramel">PKR {total}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigateToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-swan-gold to-swan-amber hover:from-swan-amber hover:to-swan-gold text-swan-dark font-bold text-sm uppercase tracking-wider shadow-glow-gold hover:shadow-lg transition-all active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex justify-center pt-2">
                <PoweredByMavi light variant="inline" />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
