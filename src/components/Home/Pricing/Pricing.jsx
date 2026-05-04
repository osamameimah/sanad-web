import { PLANS } from '../../../data/index';
import styles from './Pricing.module.css';

export default function Pricing({ onSubscribe }) {
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>الباقات</span>
          <h2 className={styles.title}>اختر باقتك المناسبة</h2>
          <p className={styles.description}>
            جميع الباقات تشمل دعماً فنياً وتحديثات مستمرة
          </p>
        </div>

        <div className={styles.grid}>
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.popular ? styles.popularCard : ''}`}
              style={{
                borderColor: plan.popular ? plan.color : 'rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.boxShadow = `0 30px 60px rgba(0,0,0,0.4),0 0 50px ${plan.glow}`;
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {plan.badge && (
                <div className={styles.badge}>{plan.badge}</div>
              )}

              <div className={styles.icon}>{plan.icon}</div>
              <h3 className={styles.cardTitle} style={{ color: plan.color }}>
                {plan.name}
              </h3>
              <p className={styles.cardSubtitle}>{plan.subtitle}</p>

              <div className={styles.price}>
                <span className={styles.priceAmount}>{plan.price}</span>
                <span className={styles.pricePeriod}> شيكل / شهرياً</span>
              </div>

              <div className={styles.features}>
                {plan.features.map((feature) => (
                  <div key={feature} className={styles.feature}>
                    <span className={styles.featureIcon} style={{ color: plan.color }}>
                      ✓
                    </span>
                    <span className={styles.featureText}>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSubscribe(plan.id)}
                className={`${styles.selectButton} ${
                  plan.popular ? styles.primaryButton : styles.secondaryButton
                }`}
                style={!plan.popular ? { borderColor: `${plan.color}55`, color: plan.color } : {}}
                onMouseEnter={(e) => {
                  if (!plan.popular) {
                    e.currentTarget.style.background = `${plan.color}22`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.popular) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }
                }}
              >
                اشترك في هذه الباقة
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}