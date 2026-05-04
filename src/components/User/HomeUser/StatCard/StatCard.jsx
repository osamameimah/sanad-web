import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ label, value, icon, accent, onEdit, isStatus, statusType }) => (
  <div className={styles.statBox}>
    {onEdit && <button className={styles.editBtn} onClick={onEdit}>تعديل <i className="fas fa-pen"></i></button>}
    <span className={styles.statLabel}>{label}</span>
    {isStatus ? (
      <span className={`${styles.statusBadge} ${statusType === 'ملغي' ? styles.statusRed : ''}`}>{value}</span>
    ) : (
      <span className={`${styles.statValue} ${accent ? styles.textAccent : ''}`}>{value}</span>
    )}
    <i className={`fas ${icon} ${styles.statIcon} ${statusType === 'ملغي' ? styles.iconRed : ''}`}></i>
  </div>
);

export default StatCard;