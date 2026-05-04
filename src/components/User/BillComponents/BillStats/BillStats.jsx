import React from 'react';
import styles from './BillStats.module.css';

const BillStats = ({ totalBills }) => {
    return (
        <div className={styles.statusCardsContainer}>
            <div className={styles.statusCard}>
                <p>عدد الفواتير الكلي</p>
                <span>{totalBills}</span>
            </div>
            <div className={`${styles.statusCard} ${styles.unpaid}`}>
                <p>غير المدفوعة</p>
                <span>20</span>
            </div>
            <div className={`${styles.statusCard} ${styles.paid}`}>
                <p>المدفوعة</p>
                <span>20</span>
            </div>
        </div>
    );
};

export default BillStats;