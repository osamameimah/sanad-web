import styles from './DashboardPreview.module.css';

const ROWS = [
  { name: 'محمد أحمد', amt: '150', status: 'مدفوعة', color: '#34D399' },
  { name: 'فاطمة علي', amt: '85', status: 'مدفوعة', color: '#34D399' },
  { name: 'أحمد سالم', amt: '732', status: 'معلقة', color: '#F87171' },
];

const MINI_STATS = [
  { label: 'التحصيل', value: '87.5%', color: '#D4AF37' },
  { label: 'الفواتير', value: '124', color: '#60A5FA' },
  { label: 'مطابقة', value: '118', color: '#34D399' },
  { label: 'معلقة', value: '6', color: '#F87171' },
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

      {ROWS.map(({ name, amt, status, color }) => (
        <div key={name} className={styles.tableRow}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{name[0]}</div>
            <span className={styles.userName}>{name}</span>
          </div>
          <span className={styles.amount}>{amt} شيكل</span>
          <span 
            className={styles.status}
            style={{ background: `${color}22`, color }}
          >
            {status}
          </span>
        </div>
      ))}

      <div className={styles.successMessage}>
        <span>🤖</span>
        <div className={styles.messageContent}>
          <div className={styles.messageTitle}>تم التحقق بنجاح ✅</div>
          <div className={styles.messageDesc}>
            حوالة محمد أحمد – 150 شيكل
          </div>
        </div>
      </div>
    </div>
  );
}