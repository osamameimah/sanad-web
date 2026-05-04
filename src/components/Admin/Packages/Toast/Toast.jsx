import React from 'react';
import styles from './Toast.module.css';

const Toast = ({ message, type }) => {
    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            <i className={type === 'success' ? 'fas fa-check-circle' : 'fas fa-trash-alt'}></i>
            {message}
        </div>
    );
};

export default Toast;