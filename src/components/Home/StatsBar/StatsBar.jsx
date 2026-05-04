import { STATS } from '../../../data/index';
import styles from './StatsBar.module.css';

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        {STATS.map(({ value, label }) => (
          <div key={label} className={styles.stat}>
            <div className={styles.value}>{value}</div>
            <div className={styles.label}>{label}</div>
          </div>
        ))}
 
      </div>
    </div>
   );
}