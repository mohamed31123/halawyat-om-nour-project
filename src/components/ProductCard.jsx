import React from 'react';
import { WHATSAPP_NUMBER } from '../utils/data';
import styles from './ProductCard.module.css';

const FALLBACK = 'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=600&q=80';

export default function ProductCard({ product }) {
  const { name, description, category, price, unit, image, badge, stock } = product;

  const handleOrder = () => {
    const msg = encodeURIComponent(`السلام عليكم أم نور 🌸\nأريد أطلب: ${name}\nالسعر: ${price} درهم / ${unit}\n\nشكراً جزيلاً 🙏`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <article className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          className={styles.img}
          src={image || FALLBACK}
          alt={name}
          onError={e => { e.target.src = FALLBACK; }}
          loading="lazy"
        />
        {badge && <span className={styles.badge}>{badge}</span>}
        {stock === 0 && <div className={styles.soldOut}>نفذ المخزون</div>}
        {stock > 0 && stock <= 5 && <div className={styles.lowStock}>⚡ آخر {stock} متبقي</div>}
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.desc}>{description}</p>

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.price}>{price}</span>
            <span className={styles.currency}>درهم</span>
            <span className={styles.unit}>/ {unit}</span>
          </div>
          <button
            className={`${styles.orderBtn} ${stock === 0 ? styles.orderDisabled : ''}`}
            onClick={handleOrder}
            disabled={stock === 0}
          >
            {stock === 0 ? 'نفذ' : (
              <><span>🛒</span> اطلبي الآن</>
            )}
          </button>
        </div>

        <div className={styles.whatsappHint}>
          <span>📱</span> الطلب عبر واتساب
        </div>
      </div>
    </article>
  );
}
