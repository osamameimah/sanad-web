import React from 'react';
import styles from './InvoiceTable.module.css';

const InvoiceTable = ({ invoices, loading, hasMore, onLoadMore }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.mainTable}>
                <thead>
                    <tr>
                        <th>الرقم</th>
                        <th>اسم العميل</th>
                        <th>رقم الجوال</th>
                        <th>المبلغ</th>
                        <th>التاريخ</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.length > 0 ? (
                        invoices.map((inv) => (
                            <tr key={inv.id}>
                                <td className={styles.idCell}>{inv.id}</td>
                                <td>{inv.customer}</td>
                                <td>0599000000</td>
                                <td className={styles.amountCell}>{inv.amount} ₪</td>
                                <td>{inv.date}</td>
                            </tr>
                        ))
                    ) : !loading && (
                        <tr>
                            <td colSpan="5" className={styles.noResults}>
                                <i className="fas fa-folder-open"></i>
                                <p>لا توجد فواتير بهذا الاسم في الأرشيف.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {loading && (
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    جاري تحديث النتائج...
                </div>
            )}

            {hasMore && !loading && invoices.length > 0 && (
                <div className={styles.loadMoreWrapper}>
                    <button className={styles.loadMoreBtn} onClick={onLoadMore}>
                        عرض فواتير أقدم
                    </button>
                </div>
            )}
        </div>
    );
};

export default InvoiceTable;