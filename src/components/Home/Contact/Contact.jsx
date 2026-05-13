 import React from 'react';
import { CONTACTS } from '../../../data/index';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>تواصل معنا</h2>
        <div className={styles.grid}>
          {CONTACTS.map(({ icon, label, value, color }) => (
            <div key={label} className={styles.card}>
              <div className={styles.icon}>{icon}</div>
              <div className={styles.label}>{label}</div>
              {/* استخدمنا اللون الممرر من البيانات فقط كـ "توهج" أو لون نص إذا كان مناسباً للقراءة */}
              <div className={styles.value} style={{ color: color }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <span className={styles.footerIcon}>💰</span>
        <span className={styles.footerTitle}>سند</span>
        <span className={styles.footerSubtitle}>· Sanad</span>
      </div>
      <span className={styles.copyright}>
        جميع الحقوق محفوظة © {new Date().getFullYear()}
      </span>
    </footer>
  );
}