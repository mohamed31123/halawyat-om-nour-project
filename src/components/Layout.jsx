import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const location = useLocation();
  const { isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdminArea = location.pathname.startsWith('/admin');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <div className={styles.root}>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoEmoji}>🍯</span>
            <div>
              <span className={styles.logoMain}>حلويات أم نور</span>
              <span className={styles.logoSub}>حلويات مغربية أصيلة</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav}>
            <Link to="/" className={`${styles.navLink} ${location.pathname === '/' ? styles.navActive : ''}`}>
              🏠 المنتجات
            </Link>
            {isAdmin ? (
              <>
                <Link to="/admin" className={`${styles.navLink} ${isAdminArea ? styles.navActive : ''}`}>
                  ⚙️ لوحة التحكم
                </Link>
                <button className={styles.logoutBtn} onClick={logout}>تسجيل الخروج</button>
              </>
            ) : (
              <Link to="/admin/login" className={styles.adminLink}>
                🔐 دخول المشرف
              </Link>
            )}
          </nav>

          {/* Mobile toggle */}
          <button className={styles.burger} onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <Link to="/" className={styles.mobileLink}>🏠 المنتجات</Link>
            {isAdmin ? (
              <>
                <Link to="/admin" className={styles.mobileLink}>⚙️ لوحة التحكم</Link>
                <button className={styles.mobileLinkBtn} onClick={logout}>🚪 تسجيل الخروج</button>
              </>
            ) : (
              <Link to="/admin/login" className={styles.mobileLink}>🔐 دخول المشرف</Link>
            )}
          </div>
        )}
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>🍯 حلويات أم نور</div>
          <p className={styles.footerTagline}>حلويات مغربية أصيلة مصنوعة بيدين وبحب</p>
          <div className={styles.footerOrnament}>❦ ❦ ❦</div>
          <p className={styles.footerCopy}>جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
