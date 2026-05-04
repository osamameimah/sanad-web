 import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { PLANS } from '../../../data'; // تأكد من صحة المسار
import { getRequests, saveRequests } from '../../../hooks/useStorage'; // تأكد من صحة المسار
import styles from './SubscriptionModal.module.css';

// مفاتيح EmailJS
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_x33f982',
  TEMPLATE_ID: 'template_4vyni7o',
  PUBLIC_KEY: 'ZfOkxY4eL6wvwGZ3B'
};

function Field({ label, name, placeholder, icon, type = 'text', value, onChange, error }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <span className={styles.inputIcon}>{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
      </div>
      {error && <p className={styles.errorText}>⚠ {error}</p>}
    </div>
  );
}

export default function SubscriptionModal({ initPlan, onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    company: '',
    plan: initPlan || (PLANS[0]?.id || ''),
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!form.phone.trim()) {
      newErrors.phone = 'رقم الجوال مطلوب';
    } else if (!/^\+97\d{7,10}$/.test(form.phone.trim())) {
      newErrors.phone = '(يجب أن يبدأ بـ +97)';
    }
    if (!form.company.trim()) newErrors.company = 'اسم الشركة مطلوب';
    if (!form.plan) newErrors.plan = 'يرجى اختيار الباقة';
    return newErrors;
  };

  const sendEmail = async () => {
    const selectedPlan = PLANS.find(p => p.id === form.plan);
    const templateParams = {
      name: form.name,
      phone: form.phone,
      company: form.company,
      plan: selectedPlan?.name || form.plan,
      planPrice: selectedPlan?.price || '',
      notes: form.notes || 'لا يوجد',
      date: new Date().toLocaleString('ar-EG'),
      to_email: 'slashco2026@gmail.com',
    };

    try {
      return await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      // 1. إرسال الإيميل
      await sendEmail();
      
      // 2. حفظ محلياً
      const selectedPlan = PLANS.find(p => p.id === form.plan);
      const request = {
        id: Date.now(),
        ...form,
        planName: selectedPlan?.name || '',
        date: new Date().toLocaleDateString('ar-IQ'),
        time: new Date().toLocaleTimeString('ar-IQ'),
      };

      const existingRequests = getRequests() || [];
      saveRequests([request, ...existingRequests]);
      
      setSubmitting(false);
      setDone(true);

    } catch (error) {
      console.error('Error:', error);
      alert('عذراً، حدث خطأ في الإرسال. الرجاء المحاولة مرة أخرى');
      setSubmitting(false);
    }
  };

  const selectedPlan = PLANS.find(p => p.id === form.plan);

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>×</button>

        {!done ? (
          <>
            <div className={styles.header}>
              <div className={styles.headerIcon}>💰</div>
              <h2 className={styles.headerTitle}>طلب الاشتراك</h2>
              <p className={styles.headerSubtitle}>سيتواصل معك فريقنا خلال 24 ساعة</p>
            </div>

            <div className={styles.formContainer}>
              <Field
                label="الاسم الكامل *"
                name="name"
                placeholder="ادخل الاسم كاملا"
                icon="👤"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Field
                label="رقم الواتس *"
                name="phone"
                placeholder="+97xxxxxxxxxx"
                icon="📱"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              <Field
                label="اسم الشركة / المتجر *"
                name="company"
                placeholder="شركة أو متجرك"
                icon="🏢"
                value={form.company}
                onChange={handleChange}
                error={errors.company}
              />

              <div className={styles.planSelector}>
                <label className={styles.label}>نوع الباقة *</label>
                {PLANS.map(plan => (
                  <div
                    key={plan.id}
                    onClick={() => handleChange('plan', plan.id)}
                    className={`${styles.planOption} ${form.plan === plan.id ? styles.planSelected : ''}`}
                    style={{
                      borderColor: form.plan === plan.id ? plan.color : undefined,
                      background: form.plan === plan.id ? `${plan.color}14` : undefined
                    }}
                  >
                    <div className={styles.planInfo}>
                      <span className={styles.planIcon}>{plan.icon}</span>
                      <div>
                        <div className={styles.planName} style={{ color: form.plan === plan.id ? plan.color : '#ddd' }}>
                          {plan.name}
                        </div>
                        <div className={styles.planSubtitle}>{plan.subtitle}</div>
                      </div>
                    </div>
                    <div className={styles.planPrice} style={{ color: plan.color }}>
                      {plan.price} دولار
                    </div>
                  </div>
                ))}
                {errors.plan && <p className={styles.errorText}>⚠ {errors.plan}</p>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>ملاحظات (اختياري)</label>
                <textarea
                  value={form.notes}
                  onChange={e => handleChange('notes', e.target.value)}
                  placeholder="أي تفاصيل إضافية..."
                  rows={3}
                  className={styles.textarea}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={styles.submitButton}
            >
              {submitting ? (
                <div className={styles.loader}>
                   <span className={styles.spinner} /> جاري الإرسال...
                </div>
              ) : '✅ إرسال طلب الاشتراك'}
            </button>
          </>
        ) : (
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>🎉</div>
            <h2 className={styles.successTitle}>تم إرسال طلبك!</h2>
            <p className={styles.successText}>
              شكراً <strong className={styles.highlight}>{form.name}</strong>،<br />
              سيتواصل معك فريق <strong className={styles.goldHighlight}>سند</strong> على الرقم<br />
              <strong className={styles.blueHighlight}>{form.phone}</strong>
            </p>
            <button onClick={onClose} className={styles.closeSuccessButton}>إغلاق</button>
          </div>
        )}
      </div>
    </div>
  );
}