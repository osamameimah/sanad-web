 import React from 'react';
import { PLANS } from '../../../data/index';
import styles from './Pricing.module.css';

export default function Pricing({ onSubscribe }) {
  // استخدام ألوان الهوية الجديدة في حال لم تكن معرفة في بيانات الباقات
  const primaryColor = "#0F766E"; 

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>الباقات</span>
          <h2 className={styles.title}>اختر باقتك المناسبة</h2>
          <p className={styles.description}>
            جميع الباقات تشمل دعماً فنياً وتحديثات مستمرة لضمان استقرار أعمالك
          </p>
        </div>

        <div className={styles.grid}>
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.popular ? styles.popularCard : ''}`}
              // تم إزالة تعديلات Shadows اليدوية والاعتماد على CSS Module للأنظف
            >
              {plan.badge && (
                <div className={styles.badge}>{plan.badge}</div>
              )}

              <div className={styles.icon}>{plan.icon}</div>
              <h3 className={styles.cardTitle} style={{ color: plan.popular ? primaryColor : '#16213A' }}>
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
                    <span className={styles.featureIcon} style={{ color: primaryColor }}>
                      ✓
                    </span>
                    <span className={styles.featureText}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* <button
                onClick={() => onSubscribe(plan.id)}
                className={`${styles.selectButton} ${
                  plan.popular ? styles.primaryButton : styles.secondaryButton
                }`}
              >
                اشترك في هذه الباقة
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}