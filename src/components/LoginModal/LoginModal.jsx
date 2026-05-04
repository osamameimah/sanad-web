 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginModal.module.css';

// بيانات وهمية للتجربة — استبدلها لاحقاً بـ API حقيقي
const MOCK_USERS = [
  { email: 'admin@sanad.com', password: '123456', role: 'admin' },
  { email: 'user@sanad.com', password: '123456', role: 'user' },
];

const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setError('');

    // محاكاة طلب API
    setTimeout(() => {
      const user = MOCK_USERS.find(
        u => u.email === form.email && u.password === form.password
      );

      if (!user) {
        setLoading(false);
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        return;
      }

      setLoading(false);
      onClose();

      if (user.role === 'admin') {
        navigate('/dashboard/home');
      } else {
        navigate('/user/home');
      }
    }, 1200);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        <div className={styles.gridLines}>
          <span /><span /><span /><span />
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 32 32" fill="none">
                <rect x="4" y="18" width="5" height="10" rx="1" fill="#D4AF37" />
                <rect x="13" y="12" width="5" height="16" rx="1" fill="#D4AF37" />
                <rect x="22" y="6" width="5" height="22" rx="1" fill="#D4AF37" />
                <path d="M6 16L15 10L24 4" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5" />
              </svg>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoAr}>سند</span>
              <span className={styles.logoEn}>SANAD</span>
            </div>
          </div>
          <h2 className={styles.title}>تسجيل الدخول</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>

          {/* Email */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>البريد الإلكتروني</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={styles.input}
                autoComplete="email"
                dir="ltr"
              />
              {form.email && (
                <div className={styles.inputCheck}>
                  <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
                    <path d="M2 6L5 9L10 3" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Password */}
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
                autoComplete="current-password"
                dir="ltr"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(p => !p)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M3 3l14 14M8.46 8.52A3 3 0 0010 13a3 3 0 003-3 3 3 0 00-.52-1.69M6.35 6.4C4.62 7.44 3.2 8.88 2.46 10c1.02 1.65 3.73 5 7.54 5 1.47 0 2.8-.5 3.93-1.27M10 5c3.81 0 6.52 3.35 7.54 5-.48.77-1.19 1.73-2.13 2.6"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M2.46 10C3.48 8.35 6.19 5 10 5s6.52 3.35 7.54 5c-1.02 1.65-3.73 5-7.54 5S3.48 11.65 2.46 10z"
                      stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className={styles.errorMsg}>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
                <path d="M8 5v4M8 11v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={`${styles.submitBtn} ${loading ? styles.loading : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                <span>تسجيل الدخول</span>
                <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <span>ليس لديك حساب؟</span>
          <button 
            type="button" 
            className={styles.registerLink} 
            onClick={(e) => {
              e.preventDefault();
              onSwitchToRegister(); // استدعاء الدالة عند الضغط
            }}
          >
            اشترك الآن
          </button>
        </div>

        {/* Hint */}
        <div className={styles.devHint}>
          <span>admin@sanad.com</span>
          <span className={styles.devDivider}>|</span>
          <span>كلمة السر: 123456</span>
          <span>user@sanad.com</span>
                    <span>كلمة السر: 123456</span>

        </div>

      </div>
    </div>
  );
};

export default LoginModal;