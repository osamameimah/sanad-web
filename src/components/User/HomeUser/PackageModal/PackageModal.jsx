import React from 'react';
import styles from './PackageModal.module.css';

const packages = [
  { id: 1, name: "الباقة الأساسية", price: 50, duration: "شهر واحد", features: ["دخول لوحة التحكم", "دعم فني إيميل"] },
  { id: 2, name: "الباقة الاحترافية", price: 150, duration: "شهر واحد", features: ["دعم 24/7", "تحليلات متقدمة"] },
  { id: 3, name: "الباقة الذهبية", price: 400, duration: "3 شهور", features: ["مدير حساب", "تخصيص كامل"] }
];

const PackageModal = ({ currentPackage, onClose, onSelect }) => (
  <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
      <div className={styles.modalHeader}>
        <h3>تغيير باقة الاشتراك</h3>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
      </div>
      <div className={styles.packageGrid}>
        {packages.map(pkg => (
          <div key={pkg.id} className={`${styles.packageCard} ${currentPackage === pkg.name ? styles.activePkg : ''}`} onClick={() => onSelect(pkg)}>
            <div className={styles.pkgBadge}>{pkg.duration}</div>
            <h4>{pkg.name}</h4>
            <div className={styles.pkgPrice}>{pkg.price} ₪</div>
            <ul className={styles.featuresList}>
              {pkg.features.map((f, i) => <li key={i}><i className="fas fa-check-circle"></i> {f}</li>)}
            </ul>
            <button className={styles.selectBtn}>{currentPackage === pkg.name ? "باقتك الحالية" : "ترقية الآن"}</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PackageModal;