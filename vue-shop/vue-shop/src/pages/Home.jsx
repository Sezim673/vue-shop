import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, Truck, Shield, RefreshCw } from 'lucide-react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        // Берем 8 случайных продуктов для featured
        const shuffled = data?.sort(() => 0.5 - Math.random()) || [];
        setFeaturedProducts(shuffled.slice(0, 8));
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const categories = [
    { id: 'lipstick', name: 'Lipstick', nameRu: 'Губная помада', icon: '💄', count: 120 },
    { id: 'foundation', name: 'Foundation', nameRu: 'Тональный крем', icon: '✨', count: 85 },
    { id: 'mascara', name: 'Mascara', nameRu: 'Тушь для ресниц', icon: '👁️', count: 64 },
    { id: 'eyeshadow', name: 'Eyeshadow', nameRu: 'Тени для век', icon: '🎨', count: 92 },
    { id: 'blush', name: 'Blush', nameRu: 'Румяна', icon: '💗', count: 45 },
    { id: 'nail_polish', name: 'Nail Polish', nameRu: 'Лак для ногтей', icon: '💅', count: 78 },
  ];
  
  const features = [
    {
      icon: <Truck size={28} />,
      title: 'Free Shipping',
      titleRu: 'Бесплатная доставка',
      desc: 'On orders over $50',
      descRu: 'При заказе от $50'
    },
    {
      icon: <Shield size={28} />,
      title: 'Secure Payment',
      titleRu: 'Безопасная оплата',
      desc: '100% secure checkout',
      descRu: '100% безопасная оплата'
    },
    {
      icon: <RefreshCw size={28} />,
      title: 'Easy Returns',
      titleRu: 'Лёгкий возврат',
      desc: '30-day return policy',
      descRu: '30 дней на возврат'
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Premium Quality',
      titleRu: 'Премиум качество',
      desc: 'Only authentic products',
      descRu: 'Только оригинальная продукция'
    },
  ];
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">
              <Sparkles size={16} />
              New Collection 2025
            </span>
            <h1 className="hero-title">{t('hero.title')}</h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <div className="hero-actions">
              <Link to="/catalog" className="btn btn-primary hero-cta">
                {t('hero.cta')}
                <ArrowRight size={18} />
              </Link>
              <Link to="/catalog" className="btn btn-secondary">
                Explore
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop"
                alt="Beauty Products"
                className="hero-img"
              />
              <div className="hero-floating-card card-1">
                <span className="floating-icon">💄</span>
                <div>
                  <span className="floating-title">500+</span>
                  <span className="floating-text">Products</span>
                </div>
              </div>
              <div className="hero-floating-card card-2">
                <span className="floating-icon">⭐</span>
                <div>
                  <span className="floating-title">4.9</span>
                  <span className="floating-text">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">
                  {t('common.language') === 'ru' ? feature.titleRu : feature.title}
                </h3>
                <p className="feature-desc">
                  {t('common.language') === 'ru' ? feature.descRu : feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find the perfect products for your beauty routine</p>
          </div>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/catalog?category=${category.id}`}
                className="category-card"
              >
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-name">
                  {t('common.language') === 'ru' ? category.nameRu : category.name}
                </h3>
                <span className="category-count">{category.count}+ items</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/catalog" className="view-all-link">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          
          {loading ? (
            <Loading type="grid" />
          ) : error ? (
            <div className="error-message">
              <p>{t('common.error')}</p>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                {t('common.tryAgain')}
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get exclusive offers and beauty tips delivered to your inbox</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="input newsletter-input"
              />
              <button type="submit" className="btn btn-pink">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;