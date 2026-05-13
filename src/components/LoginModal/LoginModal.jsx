 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginModal.module.css';

const MOCK_USERS = [
  { email: 'admin@sanad.com', password: '123456', role: 'admin' },
  { email: 'user@sanad.com', password: '123456', role: 'user' },
];

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const primaryColor = "#0F766E"; // اللون الجديد

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('يرجى إدخال جميع الحقول');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = MOCK_USERS.find(
        u => u.email === form.email && u.password === form.password
      );

      if (!user) {
        setLoading(false);
        setError('بيانات الدخول غير صحيحة');
        return;
      }

      setLoading(false);
      onClose();
      navigate(user.role === 'admin' ? '/dashboard/home' : '/user/home');
    }, 1200);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.header}>
          <div className={styles.logo}>
            {/* <div className={styles.logoIcon}>
              <svg viewBox="0 0 32 32" fill="none">
                <rect x="4" y="18" width="5" height="10" rx="1.5" fill={primaryColor} />
                <rect x="13" y="12" width="5" height="16" rx="1.5" fill={primaryColor} />
                <rect x="22" y="6" width="5" height="22" rx="1.5" fill={primaryColor} />
              </svg>
            </div> */}
            <div className={styles.logoText}>
              <span className={styles.logoAr}>سند</span>
              <span className={styles.logoEn}>SANAD</span>
            </div>
          </div>
          {/* <h2 className={styles.title}>مرحباً بك  </h2> */}
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>البريد الإلكتروني</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className={styles.input}
                dir="ltr"
              />
              {form.email.includes('@') && (
                <div className={styles.inputCheck}>
                  <svg viewBox="0 0 12 12" fill="none" width="16" height="16">
                    <path d="M2 6L5 9L10 3" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>كلمة المرور</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                dir="ltr"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(p => !p)}
              >
                {showPassword ? (
                   <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                     <path d="M3.333 3.333l13.334 13.334M8.333 8.333a2.5 2.5 0 003.334 3.334M5.5 5.5A7.5 7.5 0 001.667 10c.833 2.5 3.333 5.833 8.333 5.833 1.25 0 2.417-.417 3.417-1.083" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                   </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                    <path d="M1.667 10s3.333-5.833 8.333-5.833 8.333 5.833 8.333 5.833-3.333 5.833-8.333 5.833-8.333-5.833-8.333-5.833z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorMsg}>
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? <span className={styles.spinner} /> : "تسجيل الدخول"}
          </button>
        </form>

        <div className={styles.devHint}>
          <span>تجربة النظام (Admin): admin@sanad.com</span>
          {/* <span>تجربة النظام (User): user@sanad.com</span> */}
          <span style={{ fontWeight: 'bold' }}>كلمة المرور : 123456</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;