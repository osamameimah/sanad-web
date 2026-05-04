import { STEPS } from '../../../data/index';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>كيف يعمل</span>
          <h2 className={styles.title}>
            رحلة الدفع في ٣ خطوات لأصحاب الشركات
          </h2>
        </div>

        {STEPS.map((step) => (
          <div key={step.number} className={styles.step}>
            <div
              className={styles.stepNumber}
              style={{
                background: `${step.color}1a`,
                borderColor: `${step.color}55`,
                color: step.color,
              }}
            >
              {step.number}
            </div>
            <div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}