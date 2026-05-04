 import React from 'react';
import styles from './BillTable.module.css';

const BillTable = ({ initialLoading, currentItems, setEditModal, setDeleteModal }) => {
    return (
        <div className={styles.tableCard}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>#</th>
                        <th>الاسم</th>
                        <th>المبلغ (شيكل)</th>
                        <th>رقم الحساب</th>
                        <th>التاريخ</th>
                        <th>الوقت</th>
                        <th className={styles.textCenter}>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {initialLoading ? (
                        <tr>
                            <td colSpan="7" className={styles.loadingCell}>
                                <div className={styles.mainLoader}></div>
                                <p>جاري تحميل البيانات...</p>
                            </td>
                        </tr>
                    ) : currentItems.length > 0 ? (
                        currentItems.map((pkg, i) => (
                            <tr key={pkg.id} className={pkg.paid ? styles.paidRow : styles.unpaidRow}>
                                <td>{i + 1}</td>
                                <td><span className={styles.recived}> تم إستلام حوالة من :</span> {pkg.name}</td>
                                <td>{pkg.price} ₪</td>
                                <td>{pkg.senderaccount}</td>
                                <td>{pkg.date}</td>
                                <td>{pkg.time}</td>
                                <td className={styles.actions}>
                                    <button 
                                        className={styles.editBtn} 
                                        onClick={() => setEditModal({ open: true, data: pkg })}
                                        title="تعديل"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        className={styles.deleteBtn} 
                                        onClick={() => setDeleteModal({ open: true, targetId: pkg.id })}
                                        title="حذف"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="7" className={styles.noResults}>لا توجد نتائج</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BillTable;