import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ProductModal from '../components/ProductModal';
import ConfirmDialog from '../components/ConfirmDialog';
import styles from './AdminPage.module.css';

const FALLBACK = 'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=80&q=60';

export default function AdminPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { products, deleteProduct, toggleFeatured, resetProducts } = useProducts();

  // redirect if not logged in
  React.useEffect(() => {
    if (!isAdmin) navigate('/admin/login');
  }, [isAdmin, navigate]);

  const [modalOpen, setModalOpen]       = useState(false);
  const [editProduct, setEditProduct]   = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [search, setSearch]             = useState('');
  const [filterCat, setFilterCat]       = useState('الكل');

  /* Stats */
  const stats = useMemo(() => ({
    total:      products.length,
    stockValue: products.reduce((s, p) => s + p.price * p.stock, 0),
    lowStock:   products.filter(p => p.stock > 0 && p.stock <= 5).length,
    outStock:   products.filter(p => p.stock === 0).length,
  }), [products]);

  /* Filtered list */
  const cats = useMemo(() => ['الكل', ...new Set(products.map(p => p.category))], [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (filterCat !== 'الكل') list = list.filter(p => p.category === filterCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [products, filterCat, search]);

  /* Handlers */
  const openCreate = () => { setEditProduct(null); setModalOpen(true); };
  const openEdit   = (p) => { setEditProduct(p);   setModalOpen(true); };

  const handleModalClose = (saved) => {
    setModalOpen(false);
    if (saved) toast.success(editProduct ? 'تم تعديل المنتج ✅' : 'تمت إضافة المنتج ✅');
  };

  const handleDelete = () => {
    const name = deleteTarget.name;
    deleteProduct(deleteTarget.id);
    setDeleteTarget(null);
    toast.error(`تم حذف "${name}"`);
  };

  const handleReset = () => {
    resetProducts();
    setResetConfirm(false);
    toast('تم إعادة تعيين المنتجات 🔄');
  };

  const handleToggleFeatured = (p) => {
    toggleFeatured(p.id);
    toast(p.featured ? `تم إزالة "${p.name}" من المميزات` : `تم إضافة "${p.name}" للمميزات ⭐`);
  };

  const stockClass = (s) => s === 0 ? styles.sRed : s <= 5 ? styles.sOrange : styles.sGreen;

  if (!isAdmin) return null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* PAGE HEADER */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>⚙️ لوحة التحكم</h1>
            <p className={styles.pageSub}>إدارة منتجات حلويات أم نور</p>
          </div>
          <div className={styles.headerBtns}>
            <button className={styles.resetBtn} onClick={() => setResetConfirm(true)}>
              🔄 إعادة تعيين
            </button>
            <button className={styles.addBtn} onClick={openCreate}>
              ➕ إضافة منتج
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className={styles.statsGrid}>
          <div className={`${styles.stat} ${styles.statRose}`}>
            <span className={styles.statIcon}>🍰</span>
            <div>
              <div className={styles.statNum}>{stats.total}</div>
              <div className={styles.statLabel}>إجمالي المنتجات</div>
            </div>
          </div>
          <div className={`${styles.stat} ${styles.statGold}`}>
            <span className={styles.statIcon}>💰</span>
            <div>
              <div className={styles.statNum}>{stats.stockValue.toLocaleString('ar-MA')}</div>
              <div className={styles.statLabel}>قيمة المخزون (درهم)</div>
            </div>
          </div>
          <div className={`${styles.stat} ${styles.statOrange}`}>
            <span className={styles.statIcon}>⚡</span>
            <div>
              <div className={styles.statNum}>{stats.lowStock}</div>
              <div className={styles.statLabel}>مخزون منخفض (≤5)</div>
            </div>
          </div>
          <div className={`${styles.stat} ${styles.statRed}`}>
            <span className={styles.statIcon}>❌</span>
            <div>
              <div className={styles.statNum}>{stats.outStock}</div>
              <div className={styles.statLabel}>نفذ من المخزون</div>
            </div>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className={styles.toolbar}>
          <div className={styles.catTabs}>
            {cats.map(c => (
              <button
                key={c}
                className={`${styles.catTab} ${filterCat === c ? styles.catTabActive : ''}`}
                onClick={() => setFilterCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className={styles.searchBox}>
            <span>🔍</span>
            <input
              className={styles.searchInput}
              placeholder="ابحث عن منتج..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>}
          </div>
        </div>

        {/* TABLE */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>الصورة</th>
                <th>اسم المنتج</th>
                <th>التصنيف</th>
                <th>السعر</th>
                <th>المخزون</th>
                <th>الشارة</th>
                <th>مميز ⭐</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className={styles.emptyRow}>
                      <span>🍯</span>
                      <span>لا توجد منتجات</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.map(p => (
                <tr key={p.id} className={styles.row}>
                  <td>
                    <img
                      className={styles.thumb}
                      src={p.image || FALLBACK}
                      alt={p.name}
                      onError={e => { e.target.src = FALLBACK; }}
                    />
                  </td>
                  <td>
                    <div className={styles.prodName}>{p.name}</div>
                    <div className={styles.prodDesc}>{p.description?.slice(0, 50)}...</div>
                  </td>
                  <td>
                    <span className={styles.catChip}>{p.category}</span>
                  </td>
                  <td>
                    <span className={styles.price}>{p.price}</span>
                    <span className={styles.unit}> درهم/{p.unit}</span>
                  </td>
                  <td>
                    <span className={`${styles.stockBadge} ${stockClass(p.stock)}`}>
                      {p.stock === 0 ? 'نفذ' : p.stock}
                    </span>
                  </td>
                  <td>
                    {p.badge
                      ? <span className={styles.badgeChip}>{p.badge}</span>
                      : <span className={styles.noBadge}>—</span>
                    }
                  </td>
                  <td>
                    <button
                      className={`${styles.featBtn} ${p.featured ? styles.featOn : ''}`}
                      onClick={() => handleToggleFeatured(p)}
                      title={p.featured ? 'إزالة من المميزات' : 'إضافة للمميزات'}
                    >
                      {p.featured ? '⭐' : '☆'}
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => openEdit(p)}>
                        ✏️ تعديل
                      </button>
                      <button className={styles.delBtn} onClick={() => setDeleteTarget(p)}>
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.tableInfo}>
          عرض {filtered.length} من أصل {products.length} منتج
        </p>

      </div>

      {/* MODALS */}
      <ProductModal open={modalOpen} onClose={handleModalClose} product={editProduct} />

      <ConfirmDialog
        open={!!deleteTarget}
        title={`حذف "${deleteTarget?.name}"؟`}
        message="سيتم حذف هذا المنتج نهائياً ولا يمكن التراجع عن هذا الإجراء."
        confirmLabel="نعم، احذف"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        open={resetConfirm}
        title="إعادة تعيين المنتجات؟"
        message="سيتم استبدال جميع المنتجات الحالية بالمنتجات الافتراضية وستضيع كل تعديلاتك."
        confirmLabel="نعم، أعد التعيين"
        onConfirm={handleReset}
        onCancel={() => setResetConfirm(false)}
      />
    </div>
  );
}
