import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store';
import './Cart.css';

const Cart = () => {
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  
  const formatPrice = (price) => {
    if (!price) return '$0.00';
    return `$${parseFloat(price).toFixed(2)}`;
  };
  
  const total = getTotal();
  const shipping = total > 50 ? 0 : 5.99;
  const finalTotal = total + shipping;
  
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <ShoppingBag size={80} className="empty-icon" />
            <h1>{t('cart.title')}</h1>
            <p>{t('cart.empty')}</p>
            <Link to="/catalog" className="btn btn-primary">
              {t('cart.continue')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>{t('cart.title')}</h1>
          <button className="clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
        
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.api_featured_image || item.image_link || 'https://via.placeholder.com/120x120/F5E6D3/800020?text=No+Image'}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/120x120/F5E6D3/800020?text=No+Image';
                    }}
                  />
                </div>
                
                <div className="item-details">
                  <div className="item-info">
                    {item.brand && (
                      <span className="item-brand">{item.brand.toUpperCase()}</span>
                    )}
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="item-actions">
                    <div className="quantity-control">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="item-total">
                  {formatPrice((item.price || 0) * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal ({items.length} items)</span>
              <span>{formatPrice(total)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free-shipping' : ''}>
                {shipping === 0 ? 'FREE' : formatPrice(shipping)}
              </span>
            </div>
            
            {shipping > 0 && (
              <p className="shipping-note">
                Add ${(50 - total).toFixed(2)} more for free shipping!
              </p>
            )}
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>{t('cart.total')}</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
            
            <button className="btn btn-primary checkout-btn">
              {t('cart.checkout')}
              <ArrowRight size={18} />
            </button>
            
            <Link to="/catalog" className="continue-shopping">
              {t('cart.continue')}
            </Link>
            
            {/* Promo Code */}
            <div className="promo-section">
              <input
                type="text"
                placeholder="Promo code"
                className="input promo-input"
              />
              <button className="btn btn-secondary">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;