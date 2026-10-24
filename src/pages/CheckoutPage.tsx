import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, ShoppingBag, Sparkles, CreditCard, Banknote, Store, Truck, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderCustomerDetails } from '../types';
import { CAFE_INFO } from '../data/config';
import { PoweredByMavi } from '../components/PoweredByMavi';

interface CheckoutPageProps {
  onBackToMenu: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToMenu, onOrderSuccess }) => {
  const {
    items,
    subtotal,
    discount,
    discountCode,
    deliveryFee,
    total,
    orderType,
    setOrderType,
    placeOrder,
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_pickup' | 'card_at_counter' | 'online_card'>('cash_on_pickup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Credit card mockup fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-swan-pinkLight rounded-full mx-auto flex items-center justify-center text-swan-pinkDeep">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-swan-dark">Your basket is empty</h2>
        <p className="text-sm text-swan-cocoa">
          Please select some handcrafted drinks or fresh donuts before heading to checkout.
        </p>
        <button
          onClick={onBackToMenu}
          className="px-8 py-3.5 rounded-full bg-swan-espresso text-white font-bold text-xs uppercase tracking-wider hover:bg-swan-dark shadow-md"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!phone.trim()) errors.phone = 'Please provide a contact phone number';
    if (!email.trim() || !email.includes('@')) errors.email = 'Please provide a valid email';
    if (orderType === 'dine-in' && !tableNumber.trim()) {
      errors.tableNumber = 'Please specify your table number';
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      errors.deliveryAddress = 'Please specify your complete delivery address';
    }
    if (paymentMethod === 'online_card') {
      if (cardNumber.replace(/\s/g, '').length < 16) errors.cardNumber = 'Card number must have 16 digits';
      if (!cardExpiry.includes('/')) errors.cardExpiry = 'Format MM/YY';
      if (cardCvc.length < 3) errors.cardCvc = '3-digit CVC required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const customerDetails: OrderCustomerDetails = {
      fullName,
      phone,
      email,
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
      deliveryNotes: orderType === 'delivery' ? deliveryNotes : undefined,
      paymentMethod,
    };

    setTimeout(() => {
      const placed = placeOrder(customerDetails);
      setIsSubmitting(false);
      onOrderSuccess(placed.orderId);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <button
        onClick={onBackToMenu}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-swan-mocha hover:text-swan-dark transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Menu</span>
      </button>

      <div className="border-b border-swan-sand/40 pb-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-swan-dark">
          Order Checkout
        </h1>
        <p className="text-sm text-swan-cocoa mt-1">
          Complete your information to finalize your order with Swan Cafe.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form: Details, Fulfillment & Payment */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Fulfillment Type */}
          <div className="bg-white rounded-3xl p-6 border border-swan-sand/50 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-swan-dark flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-swan-gold text-swan-dark font-mono text-xs flex items-center justify-center font-bold">1</span>
              How would you like to receive your order?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  orderType === 'pickup'
                    ? 'border-swan-gold bg-swan-gold/10 font-bold text-swan-dark shadow-sm ring-2 ring-swan-gold/20'
                    : 'border-swan-sand/50 hover:border-swan-sand bg-swan-cream/30 text-swan-cocoa'
                }`}
              >
                <Store className="w-5 h-5 text-swan-gold mb-2" />
                <div className="text-sm font-bold">Store Pickup</div>
                <div className="text-[11px] text-swan-mocha mt-0.5">Ready in 15 mins (Free)</div>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('dine-in')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  orderType === 'dine-in'
                    ? 'border-swan-gold bg-swan-gold/10 font-bold text-swan-dark shadow-sm ring-2 ring-swan-gold/20'
                    : 'border-swan-sand/50 hover:border-swan-sand bg-swan-cream/30 text-swan-cocoa'
                }`}
              >
                <Clock className="w-5 h-5 text-swan-caramel mb-2" />
                <div className="text-sm font-bold">Dine-In</div>
                <div className="text-[11px] text-swan-mocha mt-0.5">Brought to table</div>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  orderType === 'delivery'
                    ? 'border-swan-gold bg-swan-gold/10 font-bold text-swan-dark shadow-sm ring-2 ring-swan-gold/20'
                    : 'border-swan-sand/50 hover:border-swan-sand bg-swan-cream/30 text-swan-cocoa'
                }`}
              >
                <Truck className="w-5 h-5 text-swan-pinkDeep mb-2" />
                <div className="text-sm font-bold">Express Delivery</div>
                <div className="text-[11px] text-swan-mocha mt-0.5">30-40 mins (+50 PKR)</div>
              </button>
            </div>

            {orderType === 'pickup' && (
              <div className="p-3.5 bg-swan-parchment/60 rounded-xl border border-swan-sand/50 text-xs text-swan-dark">
                <strong>Pick-up Location:</strong> {CAFE_INFO.address.full}. Contact: {CAFE_INFO.phone}. Order will be freshly prepared upon confirmation.
              </div>
            )}

            {orderType === 'dine-in' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-swan-mocha mb-1">
                  Table Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. Table 7 or Patio 3"
                  className="w-full text-sm p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none"
                />
                {formErrors.tableNumber && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.tableNumber}</p>
                )}
              </div>
            )}

            {orderType === 'delivery' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-swan-mocha mb-1">
                    Complete Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Street name, building number, floor & apartment"
                    className="w-full text-sm p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none"
                  />
                  {formErrors.deliveryAddress && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.deliveryAddress}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-swan-mocha mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Leave with security, ring bell twice..."
                    className="w-full text-sm p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Contact Information */}
          <div className="bg-white rounded-3xl p-6 border border-swan-sand/50 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-swan-dark flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-swan-gold text-swan-dark font-mono text-xs flex items-center justify-center font-bold">2</span>
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-swan-mocha mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sarah Mansour"
                  className="w-full text-sm p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none"
                />
                {formErrors.fullName && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-swan-mocha mb-1">
                  Mobile Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 010 1234 5678"
                  className="w-full text-sm p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none"
                />
                {formErrors.phone && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-swan-mocha mb-1">
                  Email Address for Digital Receipt <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="w-full text-sm p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none"
                />
                {formErrors.email && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white rounded-3xl p-6 border border-swan-sand/50 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-swan-dark flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-swan-gold text-swan-dark font-mono text-xs flex items-center justify-center font-bold">3</span>
              Payment Selection
            </h3>

            <div className="space-y-3">
              <label
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cash_on_pickup'
                    ? 'border-swan-gold bg-swan-gold/10 font-bold'
                    : 'border-swan-sand/60 hover:border-swan-sand bg-swan-cream/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-swan-caramel" />
                  <div>
                    <div className="text-sm font-bold text-swan-dark">
                      {orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter (Cash)'}
                    </div>
                    <div className="text-xs text-swan-cocoa">
                      Pay with exact change or cash upon order handover
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cash_on_pickup'}
                  onChange={() => setPaymentMethod('cash_on_pickup')}
                  className="w-4 h-4 text-swan-gold focus:ring-swan-gold"
                />
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'card_at_counter'
                    ? 'border-swan-gold bg-swan-gold/10 font-bold'
                    : 'border-swan-sand/60 hover:border-swan-sand bg-swan-cream/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-swan-caramel" />
                  <div>
                    <div className="text-sm font-bold text-swan-dark">
                      Card Machine at Counter / Upon Arrival
                    </div>
                    <div className="text-xs text-swan-cocoa">
                      Visa, Mastercard, Meeza POS contactless machine
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card_at_counter'}
                  onChange={() => setPaymentMethod('card_at_counter')}
                  className="w-4 h-4 text-swan-gold focus:ring-swan-gold"
                />
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'online_card'
                    ? 'border-swan-gold bg-swan-gold/10 font-bold'
                    : 'border-swan-sand/60 hover:border-swan-sand bg-swan-cream/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-swan-gold" />
                  <div>
                    <div className="text-sm font-bold text-swan-dark">
                      Pay Now with Card (Secure Simulation)
                    </div>
                    <div className="text-xs text-swan-cocoa">
                      Instant contactless confirmation
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'online_card'}
                  onChange={() => setPaymentMethod('online_card')}
                  className="w-4 h-4 text-swan-gold focus:ring-swan-gold"
                />
              </label>
            </div>

            {paymentMethod === 'online_card' && (
              <div className="p-4 bg-swan-cream/60 rounded-2xl border border-swan-sand/60 space-y-3 mt-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-swan-mocha mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    className="w-full text-sm font-mono p-2.5 rounded-xl border border-swan-sand outline-none"
                  />
                  {formErrors.cardNumber && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-swan-mocha mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      maxLength={5}
                      className="w-full text-sm font-mono p-2.5 rounded-xl border border-swan-sand outline-none"
                    />
                    {formErrors.cardExpiry && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.cardExpiry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-swan-mocha mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className="w-full text-sm font-mono p-2.5 rounded-xl border border-swan-sand outline-none"
                    />
                    {formErrors.cardCvc && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.cardCvc}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-swan-sand/60 shadow-luxury space-y-6 lg:sticky lg:top-28">
          <h3 className="font-serif font-bold text-xl text-swan-dark pb-3 border-b border-swan-sand/40 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs font-mono font-bold text-swan-caramel">
              {items.length} item{items.length > 1 ? 's' : ''}
            </span>
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((cartItem) => (
              <div key={cartItem.cartItemId} className="flex gap-3 text-xs">
                <img
                  src={cartItem.menuItem.image}
                  alt={cartItem.menuItem.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-swan-parchment"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between font-bold text-swan-dark">
                    <span className="truncate pr-2">
                      {cartItem.quantity}x {cartItem.menuItem.name}
                    </span>
                    <div className="text-right flex-shrink-0">
                      <span className="line-through text-gray-400 font-mono text-[10px] block">
                        PKR {(cartItem.menuItem.originalPrice || cartItem.menuItem.price * 2) * cartItem.quantity}
                      </span>
                      <span className="font-mono">PKR {cartItem.totalPrice}</span>
                    </div>
                  </div>
                  {cartItem.selectedModifiers.length > 0 && (
                    <div className="text-[10px] text-swan-cocoa/80 truncate">
                      {cartItem.selectedModifiers.map((m) => m.optionName).join(', ')}
                    </div>
                  )}
                  {cartItem.specialInstructions && (
                    <div className="text-[10px] text-swan-mocha italic truncate">
                      "{cartItem.specialInstructions}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="border-t border-swan-sand/40 pt-4 space-y-2 text-xs text-swan-cocoa">
            <div className="flex justify-between">
              <span>Original Menu Value</span>
              <span className="font-mono text-gray-400 line-through">PKR {subtotal * 2}</span>
            </div>
            <div className="flex justify-between text-green-700 font-semibold">
              <span>50% Special Discount Applied ({discountCode || 'SWAN50'})</span>
              <span className="font-mono">-PKR {subtotal}</span>
            </div>
            <div className="flex justify-between font-bold text-swan-dark pt-1 border-t border-swan-sand/30">
              <span>Subtotal</span>
              <span className="font-mono font-bold text-swan-dark">PKR {subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-700 font-semibold">
                <span>Voucher Discount ({discountCode})</span>
                <span className="font-mono">-PKR {discount}</span>
              </div>
            )}
            {orderType === 'delivery' && (
              <div className="flex justify-between">
                <span>Express Delivery</span>
                <span className="font-mono font-bold text-swan-dark">PKR {deliveryFee}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-serif font-bold text-swan-dark pt-3 border-t border-swan-sand/40">
              <span>Total Payable</span>
              <span className="font-mono text-swan-caramel">PKR {total}</span>
            </div>
          </div>

          <div className="p-3 bg-swan-parchment/70 rounded-2xl border border-swan-sand/40 text-[11px] text-swan-dark flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-swan-gold flex-shrink-0" />
            <span>Guaranteed fresh. Orders are handled with care by our barista team.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-swan-gold to-swan-amber hover:from-swan-amber hover:to-swan-gold text-swan-dark font-extrabold text-sm uppercase tracking-wider shadow-glow-gold hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Order...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Confirm & Place Order</span>
                <span className="font-mono">• PKR {total}</span>
              </>
            )}
          </button>

          <div className="flex justify-center pt-1">
            <PoweredByMavi light variant="inline" />
          </div>
        </div>

      </form>
    </div>
  );
};
