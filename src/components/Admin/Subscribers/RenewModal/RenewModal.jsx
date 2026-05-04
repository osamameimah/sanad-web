import React from 'react';
import styles from './RenewModal.module.css';

const RenewModal = ({ data, renewPeriod, customDays, onPeriodChange, onCustomDaysChange, onConfirm, onClose }) => {
    if (!data) return null;

    const addedDays = renewPeriod === 'custom' ? (parseInt(customDays) || 0) : parseInt(renewPeriod);
    const totalDays = parseInt(data.daysLeft) + addedDays;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>تجديد الاشتراك</h3>
                    <button className={styles.closeModal} onClick={onClose}>&times;</button>
                </div>

                <div className={styles.renewBody}>
                    <div className={styles.subscriberInfo}>
                        <span>المشترك: <strong>{data.name}</strong></span>
                        <span>الشركة: <strong>{data.company}</strong></span>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>اختر فترة التجديد</label>
                        <select
                            className={styles.modernSelect}
                            value={renewPeriod}
                            onChange={(e) => onPeriodChange(e.target.value)}
                        >
                            <option value="30">شهر واحد (30 يوم)</option>
                            <option value="90">3 شهور (90 يوم)</option>
                            <option value="180">6 شهور (180 يوم)</option>
                            <option value="365">سنة كاملة (365 يوم)</option>
                            <option value="custom">فترة مخصصة...</option>
                        </select>
                    </div>

                    {renewPeriod === 'custom' && (
                        <div className={styles.inputGroup}>
                            <label>عدد الأيام المخصصة</label>
                            <input
                                type="number"
                                value={customDays}
                                onChange={(e) => onCustomDaysChange(e.target.value)}
                                placeholder="مثال: 15"
                            />
                        </div>
                    )}

                    <div className={styles.calculationSummary}>
                        <div className={styles.calcRow}>
                            <span>المتبقي حالياً:</span>
                            <span>{data.daysLeft} يوم</span>
                        </div>
                        <div className={styles.calcRow}>
                            <span>سيتم إضافة:</span>
                            <span className={styles.addedDays}>+ {addedDays} يوم</span>
                        </div>
                        <hr className={styles.calcDivider} />
                        <div className={styles.calcRowTotal}>
                            <span>الرصيد الكلي الجديد:</span>
                            <span className={styles.totalDays}>{totalDays} يوم</span>
                        </div>
                    </div>
                </div>

                <div className={styles.modalActions}>
                    <button className={styles.confirmRenewBtn} onClick={onConfirm}>
                        تأكيد التجديد
                    </button>
                    <button className={styles.cancelBtn} onClick={onClose}>إلغاء</button>
                </div>
            </div>
        </div>
    );
};

export default RenewModal;