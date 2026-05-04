import React from 'react';
import styles from './BillModal.module.css';

const BillModals = ({ 
    addModal, setAddModal, handleAddSave,
    editModal, setEditModal, handleEditSave,
    deleteModal, setDeleteModal, confirmDelete 
}) => {
    return (
        <>
            {/* مودال الإضافة */}
            {addModal && (
                <div className={styles.modalOverlay} onClick={() => setAddModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>إضافة فاتورة جديدة</h3>
                            <button className={styles.closeModal} onClick={() => setAddModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleAddSave} className={styles.editForm}>
                            <div className={styles.inputGroup}>
                                <label>اسم المشترك</label>
                                <input type="text" name="name" required placeholder="أدخل الاسم الكامل" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>رقم الجوال</label>
                                <input type="text" name="phone" required placeholder="059xxxxxxx" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>المبلغ (شيكل)</label>
                                <input type="number" name="price" required placeholder="0.00" />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.saveBtn}>إضافة الآن</button>
                                <button type="button" className={styles.cancelBtn} onClick={() => setAddModal(false)}>إلغاء</button>
                            </div>
                        </form>
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
                                <label>رقم الجوال</label>
                                <input type="text" name="phone" defaultValue={editModal.data.phone} required />
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
        </>
    );
};

export default BillModals;