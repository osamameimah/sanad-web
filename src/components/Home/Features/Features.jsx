 import { FEATURES } from '../../../data/index';
import styles from './Features.module.css';

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>المميزات</span>
          <h2 className={styles.title}>
            تقنية تغير طريقة{' '}
            <span className={styles.highlight}>عملك المالي</span>
          </h2>
          <p className={styles.description}>
            نظام متكامل يربط كل عمليات الدفع والفواتير والزبائن في منصة واحدة وبأعلى دقة ممكنة.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <div key={feature.title} className={styles.card}>
              <div className={styles.cardIcon}>
                {/* يمكنك هنا وضع الأيقونة مباشرة أو تغليفها بـ Span */}
                <span>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}