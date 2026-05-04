import React from 'react';
import styles from './AddEditModal.module.css';

const AddEditModal = ({ mode, data, onSave, onClose }) => {
    const isEdit = mode === 'edit';

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>{isEdit ? 'تعديل المشترك' : 'إضافة مشترك جديد'}</h3>
                    <button className={styles.closeModal} onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={onSave} className={styles.formContainer}>
                    <div className={styles.inputGroup}>
                        <label>اسم المشترك</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="أدخل اسم المشترك"
                            defaultValue={isEdit ? data?.name : ''}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>رقم الجوال</label>
                        <input
                            type="text"
                            name="phone"
                            required
                            placeholder="أدخل رقم الجوال"
                            defaultValue={isEdit ? data?.phone : ''}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>اسم الشركة</label>
                        <input
                            type="text"
                            name="company"
                            required
                            placeholder="أدخل اسم الشركة"
                            defaultValue={isEdit ? data?.company : ''}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>الايميل</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="أدخل الايميل"
                            defaultValue={isEdit ? data?.email : ''}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>كلمة السر</label>
                        <input
                            type="text"
                            name="password"
                            required
                            placeholder="أدخل كلمة السر"
                            defaultValue={isEdit ? data?.password : ''}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>الباقة</label>
                        <select name="type" defaultValue={isEdit ? data?.type : 'basic'}>
                            <option value="basic">أساسية</option>
                            <option value="pro">متقدمة</option>
                            <option value="premium">مميزة</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>مدة الاشتراك (يوم)</label>
                        <input
                            type="number"
                            name="daysJoined"
                            required
                            defaultValue={isEdit ? data?.daysJoined : 30}
                        />
                    </div>

                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.saveBtn}>
                            {isEdit ? 'حفظ التغييرات' : 'إضافة'}
                        </button>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditModal;