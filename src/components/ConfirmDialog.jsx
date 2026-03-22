import React from 'react';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = 'تأكيد', danger = false }) {
  if (!open) return null;
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={e => e.stopPropagation()}>
        <div className={`${styles.icon} ${danger ? styles.iconDanger : styles.iconWarn}`}>
          {danger ? '🗑️' : '⚠️'}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>إلغاء</button>
          <button className={`${styles.confirmBtn} ${danger ? styles.danger : ''}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
