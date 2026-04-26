import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../store';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

const Wishlist = () => {
  const { t } = useTranslation();
  const { items } = useWishlistStore();
  
  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="empty-wishlist">
            <Heart size={80} className="empty-icon" />
            <h1>{t('wishlist.title')}</h1>
            <p>{t('wishlist.empty')}</p>
            <p className="empty-subtitle">{t('wishlist.addSome')}</p>
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
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>{t('wishlist.title')}</h1>
          <span className="wishlist-count">{items.length} items</span>
        </div>
        
        <div className="wishlist-grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="wishlist-footer">
          <Link to="/catalog" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;