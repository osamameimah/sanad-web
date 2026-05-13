 import React from 'react';
import styles from './DashboardPreview.module.css';

const ROWS = [
  { name: 'محمد أحمد', amt: '150', status: 'مدفوعة', color: '#10B981' },
  { name: 'فاطمة علي', amt: '85', status: 'مدفوعة', color: '#10B981' },
  { name: 'أحمد سالم', amt: '732', status: 'معلقة', color: '#EF4444' },
];

const MINI_STATS = [
  { label: 'التحصيل', value: '87.5%', color: '#0F766E' }, // اللون الرئيسي الجديد
  { label: 'الفواتير', value: '124', color: '#3B82F6' },
  { label: 'مطابقة', value: '118', color: '#10B981' },
  { label: 'معلقة', value: '6', color: '#EF4444' },
];

export default function DashboardPreview() {
  return (
    <div className={styles.container}>
      <div className={styles.windowDots}>
        <div className={`${styles.dot} ${styles.dotRed}`} />
        <div className={`${styles.dot} ${styles.dotYellow}`} />
        <div className={`${styles.dot} ${styles.dotGreen}`} />
        <div className={styles.windowBar} />
      </div>

      <div className={styles.statsGrid}>
        {MINI_STATS.map(({ label, value, color }) => (
          <div 
            key={label} 
            className={styles.statTile}
            style={{ borderRightColor: color }}
          >
            <div className={styles.statLabel}>{label}</div>
            <div className={styles.statValue} style={{ color }}>{value}</div>
          </div>
        ))}
      </div>

      <div className={styles.table}>
        {ROWS.map(({ name, amt, status, color }) => (
          <div key={name} className={styles.tableRow}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>{name[0]}</div>
              <span className={styles.userName}>{name}</span>
            </div>
            <span className={styles.amount}>{amt} شيكل</span>
            <span 
              className={styles.status}
              style={{ background: `${color}15`, color }} // خلفية شفافة جداً
            >
              {status}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.successMessage}>
        <span style={{ fontSize: '1.2rem' }}>🤖</span>
        <div className={styles.messageContent}>
          <div className={styles.messageTitle}>تم التحقق بنجاح ✅</div>
          <div className={styles.messageDesc}>
            حوالة محمد أحمد – 150 شيكل تمت مطابقتها آلياً
          </div>
        </div>
      </div>
    </div>
  );
}