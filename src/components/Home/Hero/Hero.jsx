// import Particles from '../../Particles/Particles';
import DashboardPreview from '../DashboardPreview/DashboardPreview';
import styles from './Hero.module.css';
import StatsBar from '../StatsBar/StatsBar';

export default function Hero({ onSubscribe }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <> 
    <section id="home" className={styles.hero}>
      <div className={styles.backgroundGlow} />
      <div className={styles.gridLines} />
      
      {/* <Particles /> */}

      <div className={styles.content}>
        <div>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>
              الأتمتة المالية الأذكى في فلسطين
            </span>
          </div>

          <h1 className={styles.title}>
            أتمتة الدفع<br />
            <span className={styles.highlight}>والتدقيق المالي</span><br />
            الذكي
          </h1>

          <p className={styles.description}>
            منصة تقنية متكاملة تربط بين عمليات الدفع الإلكتروني وأنظمة الجرد والمحاسبة.
            مطابقة آلية في <strong> ثوانٍ</strong> دون تدخل بشري.
          </p>

          <div className={styles.buttonGroup}>
            <button onClick={onSubscribe} className={styles.primaryButton}>
              🚀 إشترك الآن  
            </button>
            <button onClick={() => scrollTo('features')} className={styles.secondaryButton}>
              اكتشف المميزات ↓
            </button>
          </div>

          <div className={styles.stats}>
            {[
              { value: '50+', label: 'شركة' },
              { value: '99.9%', label: 'دقة' },
              { value: 'أقل من ثانية', label: 'مطابقة' }
            ].map(({ value, label }) => (
              <div key={label} className={styles.statItem}>
                <div className={styles.statValue}>{value}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.previewWrapper}>
          <DashboardPreview />
          <div className={styles.previewBadge}>
            ⚡ مطابقة آلية
          </div>
        </div>
      </div>
    </section>
    
    <StatsBar/>
    </>
  );
}