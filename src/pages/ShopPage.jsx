import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { CATEGORIES, WHATSAPP_NUMBER } from '../utils/data';
import ProductCard from '../components/ProductCard';
import styles from './ShopPage.module.css';

export default function ShopPage() {
  const { products } = useProducts();
  const [category, setCategory] = useState('الكل');
  const [search, setSearch] = useState('');

  const featured = useMemo(() => products.filter(p => p.featured).slice(0, 4), [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'الكل') list = list.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return list;
  }, [products, category, search]);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent('السلام عليكم أم نور 🌸\nأريد أستفسر عن الطلبات والتوصيل\nشكراً جزيلاً 🙏');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} />
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>✨ حلويات مغربية أصيلة ✨</div>
          <h1 className={styles.heroTitle}>
            حلويات<br /><em>أم نور</em>
          </h1>
          <p className={styles.heroSub}>
            مصنوعة بيدين وبحب ❤️<br />
            من أجود المكونات الطبيعية
          </p>

          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>🍯 عسل طبيعي</span>
            <span className={styles.heroBadge}>🌸 ماء الزهر</span>
            <span className={styles.heroBadge}>🌰 لوز أصيل</span>
          </div>

          <button className={styles.heroWaBtn} onClick={handleWhatsApp}>
            <span className={styles.waIcon}>📱</span>
            تواصلي معنا على واتساب
          </button>
        </div>
        <div className={styles.heroEmojis}>
          <span>🍯</span><span>🌺</span><span>✨</span>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className={styles.trustBar}>
        <span>⭐ جودة ممتازة</span>
        <span className={styles.divider}>|</span>
        <span>🚚 توصيل سريع</span>
        <span className={styles.divider}>|</span>
        <span>📱 طلب عبر واتساب</span>
        <span className={styles.divider}>|</span>
        <span>💯 مضمون 100%</span>
      </div>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>⭐ المنتجات المميزة</h2>
            <p className={styles.sectionSub}>الأكثر طلباً عند زبوناتنا</p>
          </div>
          <div className={styles.grid}>
            {featured.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.08}s` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FILTER + SEARCH */}
      <div className={styles.filtersBar}>
        <div className={styles.pills}>
          {CATEGORIES.map(c => (
            <button key={c} className={`${styles.pill} ${category === c ? styles.pillActive : ''}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className={styles.searchWrap}>
          <span>🔍</span>
          <input
            className={styles.searchInput}
            placeholder="ابحثي عن حلوى..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>}
        </div>
      </div>

      {/* ALL PRODUCTS GRID */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>🍰 كل المنتجات</h2>
          <span className={styles.count}>{filtered.length} منتج</span>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🍯</div>
            <p className={styles.emptyText}>لم نجد ما تبحثين عنه</p>
            <p className={styles.emptySub}>جربي تصنيفاً آخر أو كلمة بحث مختلفة</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* WHATSAPP BANNER */}
      <section className={styles.waBanner}>
        <div className={styles.waBannerInner}>
          <div className={styles.waEmoji}>📱</div>
          <div>
            <h3 className={styles.waTitle}>هل عندك سؤال؟ تواصلي معنا مباشرة!</h3>
            <p className={styles.waSub}>أم نور في خدمتك دائماً على واتساب 💬</p>
          </div>
          <button className={styles.waBtn} onClick={handleWhatsApp}>
            ابدأي المحادثة الآن
          </button>
        </div>
      </section>

    </div>
  );
}
