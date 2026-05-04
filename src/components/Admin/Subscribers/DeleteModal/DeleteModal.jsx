import React from 'react';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ onConfirm, onClose }) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.warningIcon}>
                    <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h3>هل أنت متأكد من الحذف؟</h3>
                <p className={styles.warningText}>لا يمكن التراجع عن هذا الإجراء</p>
                <div className={styles.modalActions}>
                    <button className={styles.confirmDeleteBtn} onClick={onConfirm}>
                        <i className="fas fa-trash-alt"></i> تأكيد الحذف
                    </button>
                    <button className={styles.cancelBtn} onClick={onClose}>إلغاء</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;