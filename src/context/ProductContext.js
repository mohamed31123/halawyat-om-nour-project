import React, { createContext, useContext, useReducer } from 'react';
import { INITIAL_PRODUCTS } from '../utils/data';
import { v4 as uuidv4 } from 'uuid';

const ProductContext = createContext(null);
const STORAGE_KEY = 'halawyat_om_nour_products';

function load() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) return JSON.parse(s);
  } catch (_) {}
  return INITIAL_PRODUCTS;
}

function save(products) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(products)); } catch (_) {}
}

function reducer(state, action) {
  let next;
  switch (action.type) {
    case 'ADD':    next = [{ ...action.payload, id: uuidv4(), createdAt: new Date().toISOString() }, ...state]; break;
    case 'UPDATE': next = state.map(p => p.id === action.payload.id ? action.payload : p); break;
    case 'DELETE': next = state.filter(p => p.id !== action.payload); break;
    case 'TOGGLE_FEATURED': next = state.map(p => p.id === action.payload ? { ...p, featured: !p.featured } : p); break;
    case 'RESET':  next = INITIAL_PRODUCTS; break;
    default: return state;
  }
  save(next);
  return next;
}

export function ProductProvider({ children }) {
  const [products, dispatch] = useReducer(reducer, null, load);
  return (
    <ProductContext.Provider value={{
      products,
      addProduct:      p  => dispatch({ type: 'ADD',             payload: p }),
      updateProduct:   p  => dispatch({ type: 'UPDATE',          payload: p }),
      deleteProduct:   id => dispatch({ type: 'DELETE',          payload: id }),
      toggleFeatured:  id => dispatch({ type: 'TOGGLE_FEATURED', payload: id }),
      resetProducts:   () => dispatch({ type: 'RESET' }),
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be inside ProductProvider');
  return ctx;
}
