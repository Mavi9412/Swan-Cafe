import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { MenuItem } from './types';

const AppContent: React.FC = () => {
  const { addToCart } = useCart();
  const [activePage, setActivePage] = useState<string>('home');
  const [menuInitialCategory, setMenuInitialCategory] = useState<string>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  const navigateToMenu = (categoryId?: string) => {
    if (categoryId) setMenuInitialCategory(categoryId);
    else setMenuInitialCategory('all');
    setActivePage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (item: MenuItem) => {
    setModalItem(item);
  };

  const handleQuickAdd = (item: MenuItem) => {
    if (item.modifierGroups?.some((g) => g.required)) {
      setModalItem(item);
    } else {
      addToCart(item, 1, []);
    }
  };

  const handleOrderSuccess = (orderId: string) => {
    setConfirmedOrderId(orderId);
    setActivePage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-swan-cream text-swan-dark font-sans selection:bg-swan-gold selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Pages Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigateToMenu={navigateToMenu}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activePage === 'menu' && (
          <MenuPage
            initialCategoryId={menuInitialCategory}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activePage === 'product' && (
          <ProductDetailPage
            productId={selectedProductId}
            onBackToMenu={() => navigateToMenu()}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            onBackToMenu={() => navigateToMenu()}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {activePage === 'order-confirmation' && (
          <OrderConfirmationPage
            orderId={confirmedOrderId}
            onNavigateToHome={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToMenu={() => navigateToMenu()}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigateToMenu={() => navigateToMenu()} />
        )}

        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(catId) => navigateToMenu(catId)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        onNavigateToCheckout={() => {
          setActivePage('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onExploreMenu={() => navigateToMenu()}
      />

      {/* Product Customization Modal */}
      <ProductModal
        item={modalItem}
        onClose={() => setModalItem(null)}
        onNavigateToProductPage={(item) => {
          setSelectedProductId(item.id);
          setActivePage('product');
          setModalItem(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
