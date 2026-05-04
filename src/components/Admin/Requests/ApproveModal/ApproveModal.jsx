 import React, { useState } from 'react';
import styles from './ApproveModal.module.css';

const ApproveModal = ({ data, onClose, onConfirm }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={`${styles.modalContent} ${styles.approveLayout}`} onClick={e => e.stopPropagation()}>
                <div className={styles.iconBox}><i className="fas fa-shield-alt"></i></div>
                <h3>تفعيل الحساب</h3>
                <p>إدخال بيانات تسجيل الدخول لـ <strong>{data.name}</strong></p>
                
                <div className={styles.inputGroup}>
                    <input 
                        type="email" placeholder="البريد الإلكتروني" 
                        value={credentials.email}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input 
                        type="password" placeholder="كلمة المرور المؤقتة" 
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    />
                </div>

                <div className={styles.modalActions}>
                    <button 
                        className={styles.approveBtn} 
                        disabled={!credentials.email || !credentials.password}
                        onClick={() => onConfirm(data.id)}
                    >تأكيد الإرسال والتفعيل</button>
                    <button className={styles.cancelBtn} onClick={onClose}>إلغاء</button>
                </div>
            </div>
        </div>
    );
};

export default ApproveModal;