import React from 'react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ onClose, onConfirm }) => (
  <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
      <div className={styles.confirmIcon}><i className="fas fa-exclamation-triangle"></i></div>
      <h3>هل أنت متأكد؟</h3>
      <p>ستفقد الوصول إلى المميزات عند انتهاء المدة.</p>
      <div className={styles.confirmActions}>
        <button className={styles.btnConfirmYes} onClick={onConfirm}>نعم، إلغاء</button>
        <button className={styles.btnConfirmNo} onClick={onClose}>تراجع</button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;