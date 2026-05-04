import React from 'react';
import styles from './PackageTable.module.css';

const PackageTable = ({ data, onView, onEdit, onDelete }) => {
    return (
        <div className={styles.tableCard}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>اسم الباقة</th>
                        <th>السعر</th>
                        <th>المشتركين</th>
                        <th>النوع</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((pkg, i) => (
                        <tr key={pkg.id}>
                            <td>{i + 1}</td>
                            <td>{pkg.name}</td>
                            <td className={styles.priceCell}>{pkg.price} ₪</td>
                            <td>{pkg.subscribers}</td>
                            <td><span className={`${styles.tag} ${styles[pkg.type]}`}>{pkg.label}</span></td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.viewBtn} onClick={() => onView(pkg)}><i className="fas fa-eye"></i></button>
                                    <button className={styles.editBtn} onClick={() => onEdit(pkg)}><i className="fas fa-edit"></i></button>
                                    <button className={styles.deleteBtn} onClick={() => onDelete(pkg.id)}><i className="fas fa-trash-alt"></i></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PackageTable;