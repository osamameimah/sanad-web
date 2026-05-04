import React from 'react';
import styles from './SubscriptionsHistoryModal.module.css';

const SubscriptionsHistoryModal = ({ data, subscriptions, onClose, onRenew }) => {
    if (!data) return null;

    const totalAmount = subscriptions.reduce((sum, s) => sum + s.amount, 0);
    const activeCount = subscriptions.filter(s => s.status === 'نشط').length;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalTitleGroup}>
                        <h3>سجل الاشتراكات</h3>
                        <span className={styles.modalSubtitle}>
                            {data.name} — {data.company}
                        </span>
                    </div>
                    <button className={styles.closeModal} onClick={onClose}>&times;</button>
                </div>

                <div className={styles.subscriptionStats}>
                    <div className={styles.statBox}>
                        <span className={styles.statNum}>{subscriptions.length}</span>
                        <span className={styles.statLabel}>إجمالي الاشتراكات</span>
                    </div>
                    <div className={styles.statBox}>
                        <span className={styles.statNum}>{totalAmount} ₪</span>
                        <span className={styles.statLabel}>إجمالي المدفوعات</span>
                    </div>
                    <div className={styles.statBox}>
                        <span className={`${styles.statNum} ${styles.activeColor}`}>
                            {activeCount}
                        </span>
                        <span className={styles.statLabel}>اشتراكات نشطة</span>
                    </div>
                </div>

                <div className={styles.subscriptionsList}>
                    {subscriptions.length === 0 ? (
                        <div className={styles.emptyHistory}>
                            <i className="fas fa-inbox"></i>
                            <p>لا يوجد سجل اشتراكات</p>
                        </div>
                    ) : (
                        subscriptions.map((sub, idx) => (
                            <div key={sub.id} className={styles.subscriptionItem}>
                                <div className={styles.subItemRight}>
                                    <div className={styles.subIndex}>#{idx + 1}</div>
                                    <div className={styles.subInfo}>
                                        <span className={styles.subDate}>
                                            <i className="fas fa-calendar-alt"></i> {sub.date}
                                        </span>
                                        <span className={styles.subPeriod}>
                                            <i className="fas fa-clock"></i> {sub.period} يوم
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.subItemLeft}>
                                    <span className={styles.subAmount}>{sub.amount} ₪</span>
                                    <span className={`${styles.subStatus} ${sub.status === 'نشط' ? styles.statusActive : styles.statusExpired}`}>
                                        <i className={`fas ${sub.status === 'نشط' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                                        {sub.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.modalActions}>
                    <button className={styles.confirmRenewBtn} onClick={onRenew}>
                        <i className="fas fa-sync-alt"></i> تجديد الاشتراك
                    </button>
                    <button className={styles.cancelBtn} onClick={onClose}>إغلاق</button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionsHistoryModal;