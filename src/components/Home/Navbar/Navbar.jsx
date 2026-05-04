 import React, { useState } from 'react';
import { useScrolled } from '../../../hooks/useScrolled';
import LoginModal from '../../LoginModal/LoginModal';
import SubscriptionModal from '../../Home/SubscriptionModal/SubscriptionModal'; 
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  ['home', 'الرئيسية'],
  ['features', 'المميزات'],
  ['pricing', 'الباقات'],
  ['contact', 'تواصل معنا'],
];

export default function Navbar() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // حالات التحكم في ظهور النوافذ المنبثقة
  const [showLogin, setShowLogin] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);

  // دالة التمرير السلس للأقسام
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  // فتح نافذة الاشتراك وإغلاق القائمة الجانبية (للموبايل)
  const openSubscription = () => {
    setShowSubscription(true);
    setMenuOpen(false);
  };

  // فتح نافذة تسجيل الدخول وإغلاق القائمة الجانبية (للموبايل)
  const openLogin = () => {
    setShowLogin(true);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        {/* الشعار */}
        <div className={styles.logoContainer}>
          <img src="/logo.svg" alt="Sanad Logo" className={styles.logo} />
          <div>
            <div className={styles.logoText}>سند</div>
            <div className={styles.logoSubtext}>SANAD</div>
          </div>
        </div>

        {/* زر القائمة للموبايل */}
        <button 
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* روابط التنقل */}
        <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
          {NAV_ITEMS.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={styles.navButton}
            >
              {label}
            </button>
          ))}
          
          {/* أزرار الأكشن للموبايل (تظهر داخل القائمة) */}
          <div className={styles.mobileActions}>
            <button 
              onClick={openLogin} 
              className={styles.loginBtn}
            >
              تسجيل الدخول
            </button>
            <button 
              onClick={openSubscription} 
              className={styles.ctaButton}
            >
              اشترك الآن
            </button>
          </div>
        </div>

        {/* أزرار الأكشن لنسخة الديسكتوب */}
        <div className={styles.desktopActions}>
          <button onClick={() => setShowLogin(true)} className={styles.loginBtn}>
            تسجيل الدخول
          </button>
          <button onClick={() => setShowSubscription(true)} className={styles.ctaButton}>
            اشترك الآن
          </button>
        </div>
      </nav>

      {/* مودال تسجيل الدخول */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onSwitchToRegister={() => {
            setShowLogin(false);      // إغلاق نافذة الدخول
            setShowSubscription(true); // فتح نافذة الاشتراك فوراً
          }} 
        />
      )}

      {/* مودال الاشتراك */}
      {showSubscription && (
        <SubscriptionModal 
          onClose={() => setShowSubscription(false)} 
          initPlan="" // يمكنك تمرير ID باقة معينة هنا إذا لزم الأمر
        />
      )}
    </>
  );
}