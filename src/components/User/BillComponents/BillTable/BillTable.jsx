import React from 'react';
import styles from './BillTable.module.css';

const BillTable = ({ data, onEdit, onDelete }) => {
    return (
        <div className={styles.tableCard}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>#</th>
                        <th>رقم الفاتورة</th>
                        <th>الاسم</th>
                        <th>رقم الجوال</th>
                        <th>المبلغ (شيكل)</th>
                        <th>التاريخ</th>
                        <th>الوقت</th>
                        <th>الحالة</th>
                        <th>تاريخ الدفع</th>
                        <th>وقت الدفع</th>
                        <th className={styles.textCenter}>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((pkg, i) => (
                            <tr key={pkg.id}>
                                <td className={styles.index}>{i + 1}</td>
                                <td>101c</td>
                                <td className={styles.pkgName}>{pkg.name}</td>
                                <td>{pkg.phone}</td>
                                <td className={styles.priceCell}>{pkg.price} ₪</td>
                                <td className={styles.dateCell}>{pkg.date}</td>
                                <td>09:10:55</td>
                                <td>مدفوعة</td>
                                <td>09:10:55</td>
                                <td>09:10:55</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button className={styles.editBtn} onClick={() => onEdit(pkg)} title="تعديل">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className={styles.deleteBtn} onClick={() => onDelete(pkg.id)} title="حذف">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className={styles.noResults}>لا يوجد نتائج تطابق بحثك..</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BillTable;