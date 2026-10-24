import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, SelectedModifier, OrderCustomerDetails, PlacedOrder } from '../types';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    menuItem: MenuItem,
    quantity: number,
    selectedModifiers?: SelectedModifier[],
    specialInstructions?: string
  ) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  discountCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  deliveryFee: number;
  total: number;
  orderType: 'pickup' | 'dine-in' | 'delivery';
  setOrderType: (type: 'pickup' | 'dine-in' | 'delivery') => void;
  placedOrders: PlacedOrder[];
  placeOrder: (customer: OrderCustomerDetails) => PlacedOrder;
  lastOrder: PlacedOrder | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'swan_cafe_cart_v1';
const ORDERS_STORAGE_KEY = 'swan_cafe_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<'pickup' | 'dine-in' | 'delivery'>('pickup');
  const [discountCode, setDiscountCode] = useState<string>('SWAN50');
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(placedOrders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [placedOrders]);

  const addToCart = (
    menuItem: MenuItem,
    quantity: number,
    selectedModifiers: SelectedModifier[] = [],
    specialInstructions?: string
  ) => {
    const modifiersCost = selectedModifiers.reduce((sum, mod) => sum + mod.priceDelta, 0);
    const unitPrice = menuItem.price + modifiersCost;
    const totalPrice = unitPrice * quantity;

    // Create unique key based on item id and serialized modifiers
    const modKey = selectedModifiers
      .map((m) => `${m.groupId}:${m.optionId}`)
      .sort()
      .join('|');
    const cartItemId = `${menuItem.id}_${modKey}_${specialInstructions || ''}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: existing.unitPrice * newQty,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            menuItem,
            quantity,
            selectedModifiers,
            specialInstructions,
            unitPrice,
            totalPrice,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.unitPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SWAN50' || cleanCode === 'FRESH50') {
      setDiscountCode('SWAN50');
      setDiscountRate(0); // 50% is already applied to all menu prices, no double discount!
      return { success: true, message: 'SWAN50 Verified: 50% discount is already active on all menu prices!' };
    } else if (cleanCode === 'WELCOME10') {
      setDiscountCode(cleanCode);
      setDiscountRate(0.1);
      return { success: true, message: '10% Welcome discount applied!' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try SWAN50' };
    }
  };

  const removePromoCode = () => {
    setDiscountCode('');
    setDiscountRate(0);
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = Math.round(subtotal * discountRate);
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 50 : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const placeOrder = (customer: OrderCustomerDetails): PlacedOrder => {
    const newOrder: PlacedOrder = {
      orderId: `SWN-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      items: [...items],
      customer,
      subtotal,
      tax: 0,
      discount,
      deliveryFee,
      total,
      status: 'confirmed',
    };

    setPlacedOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discount,
        discountCode,
        applyPromoCode,
        removePromoCode,
        deliveryFee,
        total,
        orderType,
        setOrderType,
        placedOrders,
        placeOrder,
        lastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
