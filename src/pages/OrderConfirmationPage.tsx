import React, { useState, useEffect } from 'react';
import { CheckCircle2, Printer, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface OrderConfirmationPageProps {
  orderId?: string;
  onNavigateToHome: () => void;
  onNavigateToMenu: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderId,
  onNavigateToHome,
  onNavigateToMenu,
}) => {
  const { placedOrders, lastOrder } = useCart();
  const [activeStep, setActiveStep] = useState(1);

  const order =
    (orderId ? placedOrders.find((o) => o.orderId === orderId) : null) ||
    lastOrder ||
    placedOrders[0];

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStep(2), 3000);
    const timer2 = setTimeout(() => setActiveStep(3), 8000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-swan-dark">No active order found</h2>
        <button
          onClick={onNavigateToMenu}
          className="px-6 py-2.5 rounded-full bg-swan-espresso text-white text-xs font-bold uppercase tracking-wider"
        >
          View Menu
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Top Banner Celebration */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-swan-sand/60 shadow-luxury text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full mx-auto flex items-center justify-center shadow-inner animate-pulse-subtle">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-swan-caramel bg-swan-parchment px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-swan-gold" /> Order Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-swan-dark">
            Thank You, {order.customer.fullName}!
          </h1>
          <p className="text-sm text-swan-cocoa mt-1 max-w-md mx-auto">
            Your order has been received by the Swan Cafe barista team and is now being handcrafted with love.
          </p>
        </div>

        <div className="inline-block p-4 rounded-2xl bg-swan-cream/80 border border-swan-sand/60 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-swan-mocha block">
            Order Reference
          </span>
          <span className="font-mono text-2xl font-extrabold text-swan-dark tracking-wider">
            {order.orderId}
          </span>
        </div>

        {/* Live Status Tracker */}
        <div className="pt-6 border-t border-swan-sand/40 max-w-xl mx-auto">
          <div className="grid grid-cols-3 gap-2 relative">
            
            {/* Step 1 */}
            <div className="text-center space-y-1.5">
              <div
                className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  activeStep >= 1
                    ? 'bg-swan-gold text-swan-dark shadow-glow-gold'
                    : 'bg-swan-sand text-white'
                }`}
              >
                1
              </div>
              <div className="text-xs font-bold text-swan-dark">Order Received</div>
              <div className="text-[10px] text-swan-sand/90 text-swan-mocha">Confirmed</div>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-1.5">
              <div
                className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  activeStep >= 2
                    ? 'bg-swan-gold text-swan-dark shadow-glow-gold'
                    : 'bg-swan-sand text-white'
                }`}
              >
                2
              </div>
              <div className="text-xs font-bold text-swan-dark">Preparing & Glazing</div>
              <div className="text-[10px] text-swan-mocha">In Barista Bar</div>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-1.5">
              <div
                className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  activeStep >= 3
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-swan-sand text-white'
                }`}
              >
                3
              </div>
              <div className="text-xs font-bold text-swan-dark">
                {order.customer.orderType === 'delivery' ? 'Out for Delivery' : 'Ready for Pickup'}
              </div>
              <div className="text-[10px] text-swan-mocha">Estimated ~15 min</div>
            </div>

          </div>
        </div>
      </div>

      {/* Itemized Order Details & Receipt */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-swan-sand/60 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-swan-sand/40">
          <div>
            <h3 className="font-serif font-bold text-xl text-swan-dark">
              Order Receipt
            </h3>
            <span className="text-xs text-swan-cocoa">
              {new Date(order.date).toLocaleDateString()} at{' '}
              {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-swan-mocha hover:text-swan-dark border border-swan-sand rounded-xl px-3 py-1.5 hover:bg-swan-parchment transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Customer & Fulfillment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-swan-cream/60 border border-swan-sand/40 text-xs">
          <div>
            <span className="text-swan-mocha uppercase font-bold text-[10px] block">Customer:</span>
            <div className="font-bold text-swan-dark">{order.customer.fullName}</div>
            <div className="text-swan-cocoa">{order.customer.phone} • {order.customer.email}</div>
          </div>
          <div>
            <span className="text-swan-mocha uppercase font-bold text-[10px] block">Fulfillment:</span>
            <div className="font-bold text-swan-dark capitalize">
              {order.customer.orderType === 'pickup' && 'Counter Pick-up (Swan Cafe Flagship)'}
              {order.customer.orderType === 'dine-in' && `Dine-In (${order.customer.tableNumber})`}
              {order.customer.orderType === 'delivery' && `Express Delivery (${order.customer.deliveryAddress})`}
            </div>
            <div className="text-swan-cocoa">Payment: {order.customer.paymentMethod.replace(/_/g, ' ').toUpperCase()}</div>
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-3">
          {order.items.map((cartItem) => (
            <div
              key={cartItem.cartItemId}
              className="flex justify-between items-center py-2 border-b border-swan-sand/20 text-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={cartItem.menuItem.image}
                  alt={cartItem.menuItem.name}
                  className="w-10 h-10 rounded-lg object-cover bg-swan-parchment"
                />
                <div>
                  <div className="font-bold text-swan-dark">
                    {cartItem.quantity}x {cartItem.menuItem.name}
                  </div>
                  {cartItem.selectedModifiers.length > 0 && (
                    <div className="text-[10px] text-swan-mocha">
                      {cartItem.selectedModifiers.map((m) => m.optionName).join(', ')}
                    </div>
                  )}
                  {cartItem.specialInstructions && (
                    <div className="text-[10px] text-swan-cocoa italic">
                      "{cartItem.specialInstructions}"
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="line-through text-gray-400 font-mono text-[10px] block">
                  PKR {(cartItem.menuItem.originalPrice || cartItem.menuItem.price * 2) * cartItem.quantity}
                </span>
                <span className="font-mono font-bold text-swan-dark">
                  PKR {cartItem.totalPrice}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Financials Breakdown */}
        <div className="pt-2 space-y-1.5 text-xs text-swan-cocoa border-t border-swan-sand/40">
          <div className="flex justify-between">
            <span>Original Menu Value</span>
            <span className="font-mono text-gray-400 line-through">PKR {order.subtotal * 2}</span>
          </div>
          <div className="flex justify-between text-green-700 font-semibold">
            <span>50% Special Menu Discount</span>
            <span className="font-mono">-PKR {order.subtotal}</span>
          </div>
          <div className="flex justify-between font-bold text-swan-dark pt-1 border-t border-swan-sand/30">
            <span>Subtotal</span>
            <span className="font-mono font-bold text-swan-dark">PKR {order.subtotal}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-700 font-semibold">
              <span>Promo Discount</span>
              <span className="font-mono">-PKR {order.discount}</span>
            </div>
          )}
          {order.deliveryFee > 0 && (
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-mono font-bold text-swan-dark">PKR {order.deliveryFee}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-serif font-bold text-swan-dark pt-3 border-t border-swan-sand/40">
            <span>Total Paid / Due</span>
            <span className="font-mono text-swan-caramel">PKR {order.total}</span>
          </div>
        </div>
      </div>

      {/* Return Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onNavigateToHome}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-swan-espresso hover:bg-swan-dark text-white font-bold text-xs uppercase tracking-wider transition-all"
        >
          Return to Home
        </button>
        <button
          onClick={onNavigateToMenu}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-swan-gold hover:bg-swan-amber text-swan-dark font-extrabold text-xs uppercase tracking-wider transition-all"
        >
          <span>Order More Sweets</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
