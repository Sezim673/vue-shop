import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, Menu, X, Search, Globe } from 'lucide-react';
import { useState } from 'react';
import { useCartStore, useWishlistStore } from '../store';
import './Header.css';

const Header = ({ onSearch }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const cartCount = useCartStore(state => state.getItemCount());
  const wishlistCount = useWishlistStore(state => state.items.length);
  
  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setIsLangOpen(false);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  
  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/catalog', label: t('nav.catalog') },
    { path: '/about', label: t('nav.about') },
  ];
  
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="logo-icon">✿</span>
          <span className="logo-text">VueShop</span>
        </Link>
        
        {/* Navigation */}
        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* Search Bar */}
        <form className="header-search" onSubmit={handleSearch}>
          <Search className="search-icon" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
        
        {/* Actions */}
        <div className="header-actions">
          {/* Language Switcher */}
          <div className="lang-switcher">
            <button 
              className="lang-btn"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <Globe size={20} />
              <span>{i18n.language.toUpperCase()}</span>
            </button>
            {isLangOpen && (
              <div className="lang-dropdown">
                <button 
                  className={`lang-option ${i18n.language === 'en' ? 'active' : ''}`}
                  onClick={() => toggleLanguage('en')}
                >
                  English
                </button>
                <button 
                  className={`lang-option ${i18n.language === 'ru' ? 'active' : ''}`}
                  onClick={() => toggleLanguage('ru')}
                >
                  Русский
                </button>
              </div>
            )}
          </div>
          
          {/* Wishlist */}
          <Link to="/wishlist" className="action-btn">
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="action-badge">{wishlistCount}</span>
            )}
          </Link>
          
          {/* Cart */}
          <Link to="/cart" className="action-btn">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="action-badge">{cartCount}</span>
            )}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;