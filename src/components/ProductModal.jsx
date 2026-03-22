import React, { useRef, useState, useEffect } from 'react';
import { CATEGORIES, UNITS, BADGES_LIST } from '../utils/data';
import { useProducts } from '../context/ProductContext';
import styles from './ProductModal.module.css';

const FALLBACK = 'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=600&q=80';
const EMPTY = { name: '', description: '', category: 'حلويات تقليدية', price: '', unit: 'كيلو', image: '', badge: '', stock: '', featured: false };

export default function ProductModal({ open, onClose, product }) {
  const { addProduct, updateProduct } = useProducts();
  const fileRef = useRef();
  const [form, setForm] = useState(EMPTY);
  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState({});
  const isEdit = !!product;

  useEffect(() => {
    if (!open) return;
    if (product) {
      setForm({ ...product, price: String(product.price), stock: String(product.stock), badge: product.badge || '' });
      setPreview(product.image || '');
    } else {
      setForm(EMPTY); setPreview('');
    }
    setErrors({});
  }, [open, product]);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'اسم المنتج مطلوب';
    if (!form.price || isNaN(+form.price) || +form.price <= 0) e.price = 'أدخلي سعراً صحيحاً';
    if (form.stock === '' || isNaN(+form.stock) || +form.stock < 0) e.stock = 'أدخلي الكمية المتوفرة';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => { setPreview(ev.target.result); set('image', ev.target.result); };
    r.readAsDataURL(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const p = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0, badge: form.badge || null, image: form.image || FALLBACK };
    if (isEdit) updateProduct({ ...p, id: product.id, createdAt: product.createdAt });
    else addProduct(p);
    onClose(true);
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={() => onClose(false)}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{isEdit ? '✏️ تعديل المنتج' : '➕ إضافة حلوى جديدة'}</h2>
          <button className={styles.closeBtn} onClick={() => onClose(false)}>✕</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Image upload */}
          <div className={styles.imgRow}>
            <div className={styles.imgBox} onClick={() => fileRef.current.click()}>
              {preview
                ? <img src={preview} alt="معاينة" className={styles.imgPreview} onError={e => { e.target.src = FALLBACK; }} />
                : <div className={styles.imgPlaceholder}><span>📸</span><span>اضغطي لرفع صورة</span></div>
              }
              <div className={styles.imgOverlay}><span>📷</span><span>تغيير</span></div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
            <div className={styles.field} style={{ flex: 1 }}>
              <label className={styles.lbl}>أو أدخلي رابط الصورة</label>
              <input className={styles.inp} type="url" placeholder="https://..." value={form.image.startsWith('data:') ? '' : form.image} onChange={e => { set('image', e.target.value); setPreview(e.target.value); }} />
            </div>
          </div>

          {/* Name */}
          <div className={styles.field}>
            <label className={styles.lbl}>اسم المنتج *</label>
            <input className={`${styles.inp} ${errors.name ? styles.inpErr : ''}`} value={form.name} onChange={e => set('name', e.target.value)} placeholder="مثال: كعب الغزال" />
            {errors.name && <span className={styles.err}>{errors.name}</span>}
          </div>

          {/* Description */}
          <div className={styles.field}>
            <label className={styles.lbl}>الوصف</label>
            <textarea className={`${styles.inp} ${styles.textarea}`} value={form.description} onChange={e => set('description', e.target.value)} placeholder="اوصفي هذه الحلوى..." />
          </div>

          {/* Category / Badge */}
          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.lbl}>التصنيف</label>
              <select className={styles.inp} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.filter(c => c !== 'الكل').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.lbl}>الشارة</label>
              <select className={styles.inp} value={form.badge} onChange={e => set('badge', e.target.value)}>
                {BADGES_LIST.map(b => <option key={b} value={b}>{b || '— بدون شارة —'}</option>)}
              </select>
            </div>
          </div>

          {/* Price / Unit / Stock */}
          <div className={styles.row3}>
            <div className={styles.field}>
              <label className={styles.lbl}>السعر (درهم) *</label>
              <input className={`${styles.inp} ${errors.price ? styles.inpErr : ''}`} type="number" min="0" step="0.5" value={form.price} onChange={e => set('price', e.target.value)} placeholder="85" />
              {errors.price && <span className={styles.err}>{errors.price}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.lbl}>الوحدة</label>
              <select className={styles.inp} value={form.unit} onChange={e => set('unit', e.target.value)}>
                {UNITS.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.lbl}>الكمية *</label>
              <input className={`${styles.inp} ${errors.stock ? styles.inpErr : ''}`} type="number" min="0" value={form.stock} onChange={e => set('stock', e.target.value)} placeholder="10" />
              {errors.stock && <span className={styles.err}>{errors.stock}</span>}
            </div>
          </div>

          {/* Featured */}
          <label className={styles.checkRow}>
            <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
            <span>⭐ عرض في قسم المميزات</span>
          </label>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={() => onClose(false)}>إلغاء</button>
            <button type="submit" className={styles.saveBtn}>{isEdit ? '💾 حفظ التعديلات' : '✅ إضافة المنتج'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
