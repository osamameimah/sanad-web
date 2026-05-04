import React from 'react';
import styles from './PackageModals.module.css';

const PackageModals = ({ 
    addModal, setAddModal, 
    viewModal, setViewModal, 
    editModal, setEditModal, 
    deleteModal, setDeleteModal,
    onAddSave, onEditSave, onConfirmDelete 
}) => {
    return (
        <>
            {/* عرض */}
            {viewModal.open && (
                <div className={styles.modalOverlay} onClick={() => setViewModal({ open: false, data: null })}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>تفاصيل الباقة: {viewModal.data.name}</h3>
                            <button className={styles.closeModal} onClick={() => setViewModal({ open: false, data: null })}>&times;</button>
                        </div>
                        <div className={styles.viewDetails}>
                            <div className={styles.detailItem}><strong>السعر:</strong> {viewModal.data.price} شيكل</div>
                            <div className={styles.detailItem}><strong>الحالة:</strong> {viewModal.data.label}</div>
                            <div className={styles.detailItem}>
                                <strong>المميزات:</strong>
                                <ul className={styles.featuresList}>
                                    {viewModal.data.features.map((f, i) => <li key={i}><i className="fas fa-check-circle"></i> {f}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* إضافة */}
            {addModal && (
                <div className={styles.modalOverlay} onClick={() => setAddModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>إضافة باقة جديدة</h3>
                            <button className={styles.closeModal} onClick={() => setAddModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={onAddSave}>
                            <div className={styles.inputGroup}><label>اسم الباقة</label><input type="text" name="name" required /></div>
                            <div className={styles.inputGroup}><label>السعر</label><input type="number" name="price" required /></div>
                            <div className={styles.inputGroup}>
                                <label>النوع</label>
                                <select name="type"><option value="basic">أساسية</option><option value="pro">احترافية</option><option value="premium">مميزة</option></select>
                            </div>
                            <div className={styles.inputGroup}><label>المميزات (بـ "،")</label><textarea name="features" rows="3"></textarea></div>
                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.saveBtn}>إضافة</button>
                                <button type="button" className={styles.cancelBtn} onClick={() => setAddModal(false)}>إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* تعديل */}
            {editModal.open && (
                <div className={styles.modalOverlay} onClick={() => setEditModal({ open: false, data: null })}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>تعديل الباقة</h3>
                            <button className={styles.closeModal} onClick={() => setEditModal({ open: false, data: null })}>&times;</button>
                        </div>
                        <form onSubmit={onEditSave}>
                            <div className={styles.inputGroup}><label>اسم الباقة</label><input type="text" name="name" defaultValue={editModal.data.name} required /></div>
                            <div className={styles.inputGroup}><label>السعر</label><input type="number" name="price" defaultValue={editModal.data.price} required /></div>
                            <div className={styles.inputGroup}>
                                <label>النوع</label>
                                <select name="type" defaultValue={editModal.data.type}><option value="basic">أساسية</option><option value="pro">احترافية</option><option value="premium">مميزة</option></select>
                            </div>
                            <div className={styles.inputGroup}><label>المميزات</label><textarea name="features" defaultValue={editModal.data.features.join('، ')} rows="3"></textarea></div>
                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.saveBtn}>حفظ</button>
                                <button type="button" className={styles.cancelBtn} onClick={() => setEditModal({ open: false, data: null })}>إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* حذف */}
            {deleteModal.open && (
                <div className={styles.modalOverlay} onClick={() => setDeleteModal({ open: false, targetId: null })}>
                    <div className={`${styles.modalContent} ${styles.confirmModal}`}>
                        <div className={styles.warningIcon}><i className="fas fa-exclamation-triangle"></i></div>
                        <h3>هل أنت متأكد؟</h3>
                        <div className={styles.modalActions}>
                            <button className={styles.confirmDeleteBtn} onClick={onConfirmDelete}>تأكيد الحذف</button>
                            <button className={styles.cancelBtn} onClick={() => setDeleteModal({ open: false, targetId: null })}>إلغاء</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PackageModals;