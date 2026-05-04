import React from 'react';
import styles from './Toast.module.css';

const Toast = ({ notification }) => {
    return (
        <div className={`${styles.toast} ${styles[notification.type]}`}>
            <i className={notification.type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle'}></i>
            {notification.message}
        </div>
    );
};

export default Toast;