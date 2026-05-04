import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ label, value, icon, colorClass }) => {
  return (
    <div className={`${styles.statCard} ${colorClass}`}>
      <div className={styles.iconContainer}>
        <span className={styles.iconBg}></span>
        <i className={`${icon} ${styles.statIcon}`}></i>
      </div>
      
      <div className={styles.statContent}>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
      
      <div className={styles.cardDecorator}></div>
    </div>
  );
};

export default StatCard;