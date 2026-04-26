import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <Link to="/" className="footer-logo">
            <span className="logo-icon">✿</span>
            <span className="logo-text">VueShop</span>
          </Link>
          <p className="footer-description">
            {t('hero.subtitle')}
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Shop</h4>
          <nav className="footer-nav">
            <Link to="/catalog">{t('nav.catalog')}</Link>
            <Link to="/catalog?category=lipstick">{t('nav.catalog')} - Lipstick</Link>
            <Link to="/catalog?category=foundation">{t('nav.catalog')} - Foundation</Link>
            <Link to="/catalog?category=mascara">{t('nav.catalog')} - Mascara</Link>
          </nav>
        </div>
        
        {/* Customer Service */}
        <div className="footer-section">
          <h4 className="footer-title">{t('footer.about')}</h4>
          <nav className="footer-nav">
            <Link to="/about">{t('footer.about')}</Link>
            <a href="#">{t('footer.contact')}</a>
            <a href="#">{t('footer.shipping')}</a>
            <a href="#">{t('footer.returns')}</a>
          </nav>
        </div>
        
        {/* Contact */}
        <div className="footer-section">
          <h4 className="footer-title">{t('footer.contact')}</h4>
          <div className="footer-contact">
            <div className="contact-item">
              <MapPin size={18} />
              <span>Moscow, Russia</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>+7 (999) 123-45-67</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <span>info@vueshop.com</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {currentYear} VueShop. {t('footer.rights')}.</p>
      </div>
    </footer>
  );
};

export default Footer;