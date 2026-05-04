import styles from './CTA.module.css';

export default function CTA({ onSubscribe }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          ابدأ تحويل عملك المالي{' '}
          <span className={styles.highlight}>اليوم</span>
        </h2>
        <p className={styles.description}>
          انضم إلى أكثر من 50 شركة تستخدم سند لأتمتة عملياتها المالية وتوفير الوقت والجهد.
        </p>
        <button onClick={() => onSubscribe()} className={styles.button}>
          🚀 ابدأ الآن  
        </button>
      </div>
    </section>
  );
}