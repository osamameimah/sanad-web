 import React from 'react';
import styles from './BillModals.module.css';

const BillModals = ({ deleteModal, setDeleteModal, confirmDelete, editModal, setEditModal, handleEditSave }) => {
    return (
        <>
            {/* مودال الحذف */}
            {deleteModal.open && (
                <div className={styles.modalOverlay} onClick={() => setDeleteModal({ open: false, targetId: null })}>
                    <div className={`${styles.modalContent} ${styles.confirmModal}`} onClick={e => e.stopPropagation()}>
                        <div className={styles.warningIcon}><i className="fas fa-exclamation-circle"></i></div>
                        <h3>حذف الفاتورة</h3>
                        <p>هل أنت متأكد من حذف هذه الفاتورة؟</p>
                        <div className={styles.modalActions}>
                            <button className={styles.confirmDeleteBtn} onClick={confirmDelete}>تأكيد الحذف</button>
                            <button className={styles.cancelBtn} onClick={() => setDeleteModal({ open: false, targetId: null })}>إلغاء</button>
                        </div>
                    </div>
                </div>
            )}

            {/* مودال التعديل */}
            {editModal.open && (
                <div className={styles.modalOverlay} onClick={() => setEditModal({ open: false, data: null })}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>تعديل بيانات الفاتورة</h3>
                            <button className={styles.closeModal} onClick={() => setEditModal({ open: false, data: null })}>&times;</button>
                        </div>
                        <form onSubmit={handleEditSave} className={styles.editForm}>
                            <div className={styles.inputGroup}>
                                <label>الاسم الكامل</label>
                                <input type="text" name="name" defaultValue={editModal.data.name} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>رقم الحساب</label>
                                <input type="text" name="senderaccount" defaultValue={editModal.data.senderaccount} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>المبلغ (شيكل)</label>
                                <input type="number" name="price" defaultValue={editModal.data.price} required />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.saveBtn}>حفظ التغييرات</button>
                                <button type="button" className={styles.cancelBtn} onClick={() => setEditModal({ open: false, data: null })}>إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default BillModals;