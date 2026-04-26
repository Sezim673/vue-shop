import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, Minus, Plus, Check } from 'lucide-react';
import { productService } from '../services/api';
import { useCartStore, useWishlistStore } from '../store';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const addToCart = useCartStore(state => state.addItem);
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist(id));
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
        
        // Fetch related products
        if (data?.product_type) {
          const related = await productService.getProductsByType(data.product_type);
          const filtered = related?.filter(p => p.id !== parseInt(id))?.slice(0, 4) || [];
          setRelatedProducts(filtered);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  
  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };
  
  const formatPrice = (price) => {
    if (!price) return '$0.00';
    return `$${parseFloat(price).toFixed(2)}`;
  };
  
  const getCategoryName = (type) => {
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
    return categories[type] || type;
  };
  
  // Get product colors
  const getProductColors = () => {
    if (!product?.product_colors || product.product_colors.length === 0) return [];
    return product.product_colors.slice(0, 6);
  };
  
  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <Loading type="product" />
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="error-state">
            <h2>{t('common.error')}</h2>
            <Link to="/catalog" className="btn btn-primary">
              {t('cart.continue')}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const images = [
    product.api_featured_image || product.image_link,
    product.image_link,
  ].filter(Boolean);
  
  const colors = getProductColors();
  const rating = product.rating || (Math.random() * 2 + 3).toFixed(1);
  
  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/catalog">
            <ArrowLeft size={18} />
            {t('nav.catalog')}
          </Link>
        </nav>
        
        {/* Product Main Section */}
        <div className="product-main">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image-container">
              <img
                src={images[activeImage] || 'https://via.placeholder.com/500x500/F5E6D3/800020?text=No+Image'}
                alt={product.name}
                className="main-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/500x500/F5E6D3/800020?text=No+Image';
                }}
              />
              
              {/* Wishlist Button */}
              <button 
                className={`wishlist-btn-large ${isInWishlist ? 'active' : ''}`}
                onClick={handleToggleWishlist}
              >
                <Heart size={24} fill={isInWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="thumbnails">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="product-info">
            {/* Brand */}
            {product.brand && (
              <span className="product-brand-large">
                {product.brand.toUpperCase()}
              </span>
            )}
            
            {/* Name */}
            <h1 className="product-name-large">{product.name}</h1>
            
            {/* Rating */}
            <div className="product-rating-large">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.floor(rating) ? 'var(--color-gold)' : 'none'}
                    color="var(--color-gold)"
                  />
                ))}
              </div>
              <span className="rating-value">{rating}</span>
              <span className="rating-count">({Math.floor(Math.random() * 100 + 20)} reviews)</span>
            </div>
            
            {/* Price */}
            <div className="product-price-large">
              {formatPrice(product.price)}
            </div>
            
            {/* Category */}
            {product.product_type && (
              <div className="product-meta">
                <span className="meta-label">{t('product.category')}:</span>
                <span className="meta-value">{getCategoryName(product.product_type)}</span>
              </div>
            )}
            
            {/* Colors */}
            {colors.length > 0 && (
              <div className="product-colors">
                <span className="meta-label">Colors:</span>
                <div className="color-options">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="color-swatch"
                      style={{ backgroundColor: color.hex_value }}
                      title={color.colour_name}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Description */}
            {product.description && (
              <div className="product-description">
                <h3>{t('product.description')}</h3>
                <p dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
            )}
            
            {/* Quantity & Add to Cart */}
            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <button 
                className={`btn btn-primary add-to-cart-btn ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    {t('product.addToCart')}
                  </>
                )}
              </button>
            </div>
            
            {/* Features */}
            <div className="product-features">
              <div className="feature-item">
                <Truck size={20} />
                <span>Free shipping over $50</span>
              </div>
              <div className="feature-item">
                <Shield size={20} />
                <span>Secure payment</span>
              </div>
              <div className="feature-item">
                <RefreshCw size={20} />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="related-grid">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;