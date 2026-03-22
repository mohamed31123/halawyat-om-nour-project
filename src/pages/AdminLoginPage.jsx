import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './AdminLoginPage.module.css';

export default function AdminLoginPage() {
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(password);
    setLoading(false);
    if (ok) {
      navigate('/admin');
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.glowTop} />
      <div className={styles.glowBottom} />

      <div className={`${styles.card} ${shake ? styles.shake : ''}`}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <div className={styles.logoEmoji}>🍯</div>
          <h1 className={styles.logoText}>حلويات أم نور</h1>
          <p className={styles.logoSub}>لوحة تحكم المشرف</p>
        </div>

        <div className={styles.divider}>
          <span>🔐</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>كلمة المرور</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>🔑</span>
              <input
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="أدخل كلمة المرور..."
                autoFocus
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShow(v => !v)}
                tabIndex={-1}
              >
                {show ? '🙈' : '👁️'}
              </button>
            </div>
            {error && (
              <div className={styles.errorMsg}>
                <span>⚠️</span> {error}
              </div>
            )}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading || !password}>
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <><span>🚪</span> دخول</>
            )}
          </button>
        </form>

        <div className={styles.hint}>
          <p>كلمة المرور الافتراضية: <code>omnour2024</code></p>
          <p style={{ marginTop: 6, fontSize: '0.75rem', opacity: 0.6 }}>
            غيّري كلمة المرور في ملف <code>src/utils/data.js</code>
          </p>
        </div>

        <div className={styles.backLink}>
          <a href="/">← العودة للمتجر</a>
        </div>
      </div>
    </div>
  );
}
