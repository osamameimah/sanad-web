import React from 'react';
import styles from './HistoryTable.module.css';

const HistoryTable = ({ history }) => (
  <section className={styles.historySection}>
    <div className={styles.sectionHeader}>
      <h3><i className="fas fa-history"></i> سجل الاشتراكات</h3>
    </div>
    <div className={styles.tableWrapper}>
      <table className={styles.historyTable}>
        <thead>
          <tr><th>التاريخ</th><th>الباقة</th><th>المبلغ</th><th>الحالة</th></tr>
        </thead>
        <tbody>
          {history.map(item => (
            <tr key={item.id}>
              <td>{item.date}</td><td>{item.package}</td><td>{item.amount} ₪</td>
              <td><span className={styles.tagGreen}>{item.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default HistoryTable;