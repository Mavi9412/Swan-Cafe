export type CategoryId = 
  | 'hot-coffee-tea'
  | 'donut-sweets'
  | 'cold-coffee'
  | 'milkshake'
  | 'fresh-juice'
  | 'ice-cream';

export interface ModifierOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  type: 'radio' | 'checkbox';
  options: ModifierOption[];
  maxSelections?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // 50% discounted price from menu
  originalPrice: number; // Full price before 50% discount (2x price)
  description: string;
  image: string;
  badge?: string;
  popular?: boolean;
  isSignature?: boolean;
  modifierGroups?: ModifierGroup[];
  nutritionSummary?: string;
  ingredients?: string[];
}

export interface SelectedModifier {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  priceDelta: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedModifiers: SelectedModifier[];
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'pickup' | 'dine-in' | 'delivery';

export interface OrderCustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: string;
  deliveryNotes?: string;
  paymentMethod: 'cash_on_pickup' | 'card_at_counter' | 'online_card';
  scheduledTime?: string;
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  customer: OrderCustomerDetails;
  subtotal: number;
  tax: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'confirmed' | 'preparing' | 'ready' | 'completed';
}
