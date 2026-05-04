 import React from 'react';
import styles from './RequestModals.module.css';

const RequestModals = ({ modals, setModals, onSave, onConfirmDelete }) => {
    
    // دالة موحدة لإغلاق جميع المودالات
    const closeAll = () => setModals({ 
        add: false, 
        edit: { open: false, data: null }, 
        delete: { open: false, id: null }, 
        approve: { open: false, data: null } 
    });

    const isEdit = modals.edit.open;
    const currentData = modals.edit.data;

    // معالجة إرسال الفورم (إضافة أو تعديل)
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const type = formData.get('type');
        
        // مابينج لليبل الباقة بناءً على النوع
        const labels = { basic: 'أساسية', pro: 'متقدمة', premium: 'مميزة' };

        const payload = {
            id: isEdit ? currentData.id : Date.now(),
            name: formData.get('name'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            type: type,
            label: labels[type],
            daysJoined: parseInt(formData.get('daysJoined')),
        };

        onSave(payload, isEdit);
        closeAll();
    };

    return (
        <>
            {/* --- مودال الإضافة والتعديل --- */}
            {(modals.add || modals.edit.open) && (
                <div className={styles.modalOverlay} onClick={closeAll}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>
                                <i className={isEdit ? "fas fa-edit" : "fas fa-plus-circle"}></i>
                                {isEdit ? ' تعديل بيانات الطلب' : ' إضافة طلب اشتراك جديد'}
                            </h3>
                            <button className={styles.closeModal} onClick={closeAll}>&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.formContainer}>
                            <div className={styles.inputGroup}>
                                <label>الاسم الكامل</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    defaultValue={currentData?.name} 
                                    placeholder="أدخل اسم المشترك"
                                    required 
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>رقم التواصل</label>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    defaultValue={currentData?.phone} 
                                    placeholder="059xxxxxxx"
                                    required 
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>اسم المنشأة / الشركة</label>
                                <input 
                                    type="text" 
                                    name="company" 
                                    defaultValue={currentData?.company} 
                                    placeholder="أدخل اسم الشركة"
                                    required 
                                />
                            </div>

                            <div className={styles.rowInputs}>
                                <div className={styles.inputGroup}>
                                    <label>نوع الباقة</label>
                                    <select name="type" defaultValue={currentData?.type || 'basic'}>
                                        <option value="basic">الباقة الأساسية</option>
                                        <option value="pro">باقة الأعمال (Pro)</option>
                                        <option value="premium">الباقة الذهبية (Premium)</option>
                                    </select>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>مدة الاشتراك (يوم)</label>
                                    <input 
                                        type="number" 
                                        name="daysJoined" 
                                        defaultValue={currentData?.daysJoined || 30} 
                                        min="1"
                                        required 
                                    />
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.saveBtn}>
                                    <i className="fas fa-check"></i>
                                    {isEdit ? 'حفظ التغييرات' : 'إتمام الإضافة'}
                                </button>
                                <button type="button" className={styles.cancelBtn} onClick={closeAll}>
                                    تراجع
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- مودال تأكيد الحذف --- */}
            {modals.delete.open && (
                <div className={styles.modalOverlay} onClick={closeAll}>
                    <div className={`${styles.modalContent} ${styles.confirmModal}`}>
                        <div className={styles.warningIcon}>
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <h3>تأكيد حذف الطلب</h3>
                        <p>هل أنت متأكد من حذف هذا الاشتراك؟ لا يمكن التراجع عن هذه الخطوة.</p>
                        
                        <div className={styles.modalActions}>
                            <button 
                                className={styles.deleteBtn} 
                                onClick={() => { onConfirmDelete(modals.delete.id); closeAll(); }}
                            >
                                <i className="fas fa-trash-alt"></i> حذف الآن
                            </button>
                            <button className={styles.cancelBtn} onClick={closeAll}>
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RequestModals;