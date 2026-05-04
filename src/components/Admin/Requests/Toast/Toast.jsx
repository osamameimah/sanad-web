 import React from 'react';
import styles from './Toast.module.css';

const Toast = ({ message, type }) => (
    <div className={`${styles.toast} ${styles[type]}`}>
        <i className={type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
        {message}
    </div>
);

export default Toast;