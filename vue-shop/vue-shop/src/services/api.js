import axios from 'axios';

const API_BASE_URL = 'https://makeup-api.herokuapp.com/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

export const productService = {
  getAllProducts: async () => {
    const response = await api.get('/products.json');
    return response.data;
  },
  
  getProductsByBrand: async (brand) => {
    const response = await api.get(`/products.json?brand=${brand}`);
    return response.data;
  },
  
  getProductsByType: async (productType) => {
    const response = await api.get(`/products.json?product_type=${productType}`);
    return response.data;
  },
  
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}.json`);
    return response.data;
  },
  
  searchProducts: async (query) => {
    const response = await api.get(`/products.json?product_tags=${query}`);
    return response.data;
  },
  
  getProductCategories: () => [
    { id: 'blush', name: 'Blush', nameRu: 'Румяна' },
    { id: 'bronzer', name: 'Bronzer', nameRu: 'Бронзер' },
    { id: 'eyebrow', name: 'Eyebrow', nameRu: 'Брови' },
    { id: 'eyeliner', name: 'Eyeliner', nameRu: 'Подводка' },
    { id: 'eyeshadow', name: 'Eyeshadow', nameRu: 'Тени' },
    { id: 'foundation', name: 'Foundation', nameRu: 'Тональный крем' },
    { id: 'lip_liner', name: 'Lip Liner', nameRu: 'Карандаш для губ' },
    { id: 'lipstick', name: 'Lipstick', nameRu: 'Помада' },
    { id: 'mascara', name: 'Mascara', nameRu: 'Тушь' },
    { id: 'nail_polish', name: 'Nail Polish', nameRu: 'Лак для ногтей' }
  ],
  
  getPopularBrands: () => [
    'maybelline',
    'covergirl',
    'l\'oreal',
    'nyx',
    'dior',
    'clinique',
    'revlon',
    'benefit',
    'fenty',
    'glossier'
  ]
};