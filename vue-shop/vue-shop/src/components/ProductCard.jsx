import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../store';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation();
  const addToCart = useCartStore(state => state.addItem);
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id));
  
  const isWishlisted = isInWishlist;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };
  
  // Форматирование цены
  const formatPrice = (price) => {
    if (!price) return '$0.00';
    return `$${parseFloat(price).toFixed(2)}`;
  };
  
  // Получить название категории на нужном языке
  const getCategoryName = () => {
    if (!product.product_type) return '';
    const categories = {
      blush: i18n.language === 'ru' ? 'Румяна' : 'Blush',
      bronzer: i18n.language === 'ru' ? 'Бронзер' : 'Bronzer',
      eyebrow: i18n.language === 'ru' ? 'Брови' : 'Eyebrow',
      eyeliner: i18n.language === 'ru' ? 'Подводка' : 'Eyeliner',
      eyeshadow: i18n.language === 'ru' ? 'Тени' : 'Eyeshadow',
      foundation: i18n.language === 'ru' ? 'Тональный крем' : 'Foundation',
      lip_liner: i18n.language === 'ru' ? 'Карандаш для губ' : 'Lip Liner',
      lipstick: i18n.language === 'ru' ? 'Помада' : 'Lipstick',
      mascara: i18n.language === 'ru' ? 'Тушь' : 'Mascara',
      nail_polish: i18n.language === 'ru' ? 'Лак' : 'Nail Polish'
    };
    return categories[product.product_type] || product.product_type;
  };
  
  // Рейтинг (сгенерированный, так как API не даёт рейтинг)
  const rating = product.rating || (Math.random() * 2 + 3).toFixed(1);
  
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {/* Image Container */}
      <div className="product-image-container">
        {product.api_featured_image || product.image_link ? (
          <img
            src={product.api_featured_image || product.image_link}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x300/F5E6D3/800020?text=No+Image';
            }}
          />
        ) : (
          <div className="product-image-placeholder">
            <span>✿</span>
          </div>
        )}
        
        {/* Category Badge */}
        {product.product_type && (
          <span className="product-category-badge">
            {getCategoryName()}
          </span>
        )}
        
        {/* Wishlist Button */}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleToggleWishlist}
        >
          <Heart 
            size={20} 
            fill={isWishlisted ? 'currentColor' : 'none'}
          />
        </button>
        
        {/* Quick Add Button */}
        <button 
          className="quick-add-btn"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} />
          <span>{t('product.addToCart')}</span>
        </button>
      </div>
      
      {/* Content */}
      <div className="product-content">
        {/* Brand */}
        {product.brand && (
          <span className="product-brand">
            {product.brand.toUpperCase()}
          </span>
        )}
        
        {/* Name */}
        <h3 className="product-name">{product.name}</h3>
        
        {/* Rating */}
        <div className="product-rating">
          <Star size={14} fill="var(--color-gold)" color="var(--color-gold)" />
          <span>{rating}</span>
        </div>
        
        {/* Price */}
        <div className="product-price">
          {formatPrice(product.price)}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;