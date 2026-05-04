import React from 'react';
import styles from './WelcomeState.module.css';

const WelcomeState = () => (
    <div className={styles.welcomeState}>
        <i className="fas fa-search-dollar"></i>
        <h3>استعراض فواتير الأرشيف</h3>
        <p>اختر شهراً أو اكتب اسماً للبدء في عرض النتائج.</p>
    </div>
);

export default WelcomeState;