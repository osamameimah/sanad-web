 import React from 'react';
import styles from './RequestsTable.module.css';

const RequestTable = ({ data, onApprove, onEdit, onDelete }) => (
    <div className={styles.tableCard}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>الاسم</th>
                    <th>الجوال</th>
                    <th>الشركة</th>
                    <th>الباقة</th>
                    <th>المدة</th>
                    <th className={styles.textCenter}>الإجراءات</th>
                </tr>
            </thead>
            <tbody>
                {data.map((req, i) => (
                    <tr key={req.id}>
                        <td>{i + 1}</td>
                        <td className={styles.pkgName}>{req.name}</td>
                        <td>{req.phone}</td>
                        <td>{req.company}</td>
                        <td><span className={`${styles.tag} ${styles[req.type]}`}>{req.label}</span></td>
                        <td>{req.daysJoined} يوم</td>
                        <td className={styles.actions}>
                            <button className={styles.approveBtn} onClick={() => onApprove(req)}><i className="fas fa-check"></i></button>
                            <button className={styles.editBtn} onClick={() => onEdit(req)}><i className="fas fa-edit"></i></button>
                            <button className={styles.deleteBtn} onClick={() => onDelete(req.id)}><i className="fas fa-trash-alt"></i></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default RequestTable;