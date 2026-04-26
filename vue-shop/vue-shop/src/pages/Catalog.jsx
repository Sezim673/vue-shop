import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Filter, X, ChevronDown, Grid, List } from 'lucide-react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import './Catalog.css';

const Catalog = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = productService.getProductCategories();
  const brands = productService.getPopularBrands();
  
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data;
        
        if (selectedCategory) {
          data = await productService.getProductsByType(selectedCategory);
        } else if (selectedBrand) {
          data = await productService.getProductsByBrand(selectedBrand);
        } else {
          data = await productService.getAllProducts();
        }
        
        setProducts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory, selectedBrand]);
  
  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    setSearchParams(params);
  }, [selectedCategory, setSearchParams]);
  
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }
    
    // Price filter
    result = result.filter(product => {
      const price = parseFloat(product.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Sorting
    switch (sortBy) {
      case 'priceAsc':
        result.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
        break;
      case 'priceDesc':
        result.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
        break;
      case 'nameAsc':
        result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'nameDesc':
        result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        break;
      default:
        break;
    }
    
    return result;
  }, [products, searchQuery, priceRange, sortBy]);
  
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 100]);
    setSearchQuery('');
    setSortBy('default');
  };
  
  const hasActiveFilters = selectedCategory || selectedBrand || searchQuery || 
    priceRange[0] > 0 || priceRange[1] < 100;
  
  return (
    <div className="catalog-page">
      <div className="container">
        {/* Header */}
        <div className="catalog-header">
          <div className="catalog-title-section">
            <h1 className="catalog-title">{t('catalog.title')}</h1>
            <p className="catalog-count">
              {filteredProducts.length} {i18n.language === 'ru' ? 'товаров' : 'products'}
            </p>
          </div>
          
          <div className="catalog-controls">
            {/* Search */}
            <div className="catalog-search">
              <input
                type="text"
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
            </div>
            
            {/* Sort */}
            <div className="catalog-sort">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input sort-select"
              >
                <option value="default">{t('catalog.sort')}</option>
                <option value="priceAsc">{t('catalog.sortOptions.priceAsc')}</option>
                <option value="priceDesc">{t('catalog.sortOptions.priceDesc')}</option>
                <option value="nameAsc">{t('catalog.sortOptions.nameAsc')}</option>
                <option value="nameDesc">{t('catalog.sortOptions.nameDesc')}</option>
              </select>
              <ChevronDown className="select-arrow" />
            </div>
            
            {/* View Mode */}
            <div className="view-modes">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
            
            {/* Filter Toggle (Mobile) */}
            <button 
              className="filter-toggle"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={20} />
              {t('catalog.filter')}
            </button>
          </div>
        </div>
        
        <div className="catalog-content">
          {/* Sidebar Filters */}
          <aside className={`catalog-sidebar ${isFilterOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h3>{t('catalog.filter')}</h3>
              {hasActiveFilters && (
                <button className="clear-filters" onClick={clearFilters}>
                  <X size={16} />
                  Clear all
                </button>
              )}
              <button 
                className="close-sidebar"
                onClick={() => setIsFilterOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-title">{t('catalog.category')}</h4>
              <div className="filter-options">
                <label className={`filter-option ${!selectedCategory ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="category"
                    checked={!selectedCategory}
                    onChange={() => setSelectedCategory('')}
                  />
                  <span>{t('catalog.all')}</span>
                </label>
                {categories.map((cat) => (
                  <label 
                    key={cat.id}
                    className={`filter-option ${selectedCategory === cat.id ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                    />
                    <span>{i18n.language === 'ru' ? cat.nameRu : cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Brand Filter */}
            <div className="filter-group">
              <h4 className="filter-title">{t('catalog.brand')}</h4>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="input brand-select"
              >
                <option value="">{t('catalog.all')}</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand.charAt(0).toUpperCase() + brand.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Price Filter */}
            <div className="filter-group">
              <h4 className="filter-title">{t('catalog.price')}</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="input price-input"
                  min="0"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="input price-input"
                  min="0"
                />
              </div>
            </div>
          </aside>
          
          {/* Products Grid */}
          <main className="catalog-main">
            {loading ? (
              <Loading type="grid" />
            ) : error ? (
              <div className="error-state">
                <p>{t('common.error')}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                  {t('common.tryAgain')}
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🔍</span>
                <h3>{t('common.noResults')}</h3>
                <p>Try adjusting your filters</p>
                <button className="btn btn-secondary" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`products-grid ${viewMode}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalog;