import React from 'react';
import styles from './SubscribersTable.module.css';

const SubscribersTable = ({ subscribers, onEdit, onDelete, onRenew, onHistory, getSubscriptionsCount }) => {
    return (
        <div className={styles.tableCard}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ width: '40px' }}>#</th>
                        <th>اسم المشترك</th>
                        <th>رقم الجوال</th>
                        <th>الايميل</th>
                        <th>كلمة السر</th>
                        <th>الشركة</th>
                        <th>الباقة</th>
                        <th>مدة الاشتراك</th>
                        <th>المتبقي</th>
                        <th>سجل الاشتراكات</th>
                        <th className={styles.textCenter}>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {subscribers.map((pkg, i) => (
                        <tr key={pkg.id}>
                            <td>{i + 1}</td>
                            <td className={styles.pkgName}>{pkg.name}</td>
                            <td>{pkg.phone}</td>
                            <td>{pkg.email}</td>
                            <td>{pkg.password}</td>
                            <td>{pkg.company}</td>
                            <td>
                                <span className={`${styles.tag} ${styles[pkg.type]}`}>
                                    {pkg.label}
                                </span>
                            </td>
                            <td>{pkg.daysJoined} يوم</td>
                            <td className={pkg.daysLeft < 7 ? styles.danger : ''}>
                                {pkg.daysLeft} يوم
                            </td>
                            <td>
                                <button
                                    className={styles.historyBtn}
                                    onClick={() => onHistory(pkg)}
                                    title="عرض سجل الاشتراكات"
                                >
                                    <i className="fas fa-history"></i>
                                    <span className={styles.historyCount}>
                                        {getSubscriptionsCount(pkg.id)}
                                    </span>
                                </button>
                            </td>
                            <td>
                                <div className={styles.actions}>
                                    {/* <button
                                        className={styles.renewBtn}
                                        onClick={() => onRenew(pkg)}
                                        title="تجديد"
                                    >
                                        <i className="fas fa-sync-alt"></i>
                                    </button> */}
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => onEdit(pkg)}
                                        title="تعديل"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => onDelete(pkg.id)}
                                        title="حذف"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubscribersTable;