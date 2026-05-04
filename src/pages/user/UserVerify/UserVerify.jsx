import React, { useState, useMemo } from 'react';
import styles from './UserVerify.module.css';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

const UserVerify = () => {

    const handleDelete = (id) => {
    // if (window.confirm("هل أنت متأكد من حذف هذه الفاتورة؟")) {
        setInvoices(prev => prev.filter(inv => inv.id !== id));
    // }
};
  // 1. بيانات وهمية للفواتير الصادرة
const [invoices, setInvoices] = useState([
    { id: 1, name: 'أحمد خليل', phone: '0599123456', amount: 500 },
    { id: 2, name: 'سارة العلي', phone: '0598765432', amount: 250 },
    { id: 3, name: 'شركة البركة', phone: '0566112233', amount: 1200 },
    { id: 4, name: 'محمد حسن', phone: '0592334455', amount: 150 },
]);

  // 2. بيانات وهمية للإشعارات الواصلة من البنك (Live)
  const [bankNotifications] = useState([
    { id: 101, sender: 'احمد خليل حسن', amount: 500, time: '10:15 AM' },
    { id: 102, sender: 'SARA ALALI', amount: 200, time: '10:45 AM' }, // مبلغ ناقص
    { id: 103, sender: 'رقم مجهول', amount: 100, time: '11:00 AM' }, // غير موجود في الفواتير
  ]);

  // 3. منطق المطابقة (Matching Logic)
  const matchingReport = useMemo(() => {
    return invoices.map(inv => {
      // محاولة إيجاد إشعار بنكي يطابق الاسم (جزئياً) أو المبلغ
      const match = bankNotifications.find(notif => 
        notif.amount === inv.amount || notif.sender.includes(inv.name.split(' ')[0])
      );

      if (!match) return { ...inv, status: 'missing', reason: 'لم يصل إشعار بعد' };
      if (match.amount < inv.amount) return { ...inv, status: 'partial', paid: match.amount, reason: 'مبلغ ناقص' };
      return { ...inv, status: 'success', paid: match.amount, reason: 'مطابق' };
    });
  }, [invoices, bankNotifications]);

  // حساب الإحصائيات
  const stats = {
    totalRequired: invoices.reduce((acc, curr) => acc + curr.amount, 0),
    totalReceived: bankNotifications.reduce((acc, curr) => acc + curr.amount, 0),
    count: invoices.length
  };

  return (
    <>
      <Breadcrumb content="مطابقة إشعارات البنك" />

      {/* قسم الإحصائيات */}
      <div className={styles.statsGrid}>
        {/* <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.blue}`}>
            <i className="fas fa-file-invoice-dollar"></i>
          </div>
          <div>
            <div className={styles.statValue}>{stats.totalRequired} ₪</div>
            <div className={styles.statLabel}>إجمالي الفواتير الصادرة</div>
          </div>
        </div> */}

        {/* <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.green}`}>
            <i className="fas fa-hand-holding-usd"></i>
          </div>
          <div>
            <div className={styles.statValue}>{stats.totalReceived} ₪</div>
            <div className={styles.statLabel}>المبالغ المستلمة (البنك)</div>
          </div>
        </div> */}

        {/* <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.red}`}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div>
            <div className={styles.statValue}>{stats.totalRequired - stats.totalReceived} ₪</div>
            <div className={styles.statLabel}>المبالغ المتبقية</div>
          </div>
        </div> */}
      </div>

      <div className={styles.comparisonContainer}>
        {/* جدول الفواتير المطلوب تحصيلها */}
        <div className={styles.tableWrapper}>
          <h3 className={styles.tableTitle}><i className="fas fa-list-ul"></i> الفواتير الصادرة ({invoices.length})</h3>
          <div className={styles.scrollableTable} style={{ maxHeight: '300px' }}>
            <table className={styles.verificationTable}>
              <thead>
                <tr><th>الاسم</th><th>الجوال</th><th>المبلغ</th></tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id}>
                    <td>{inv.name}</td>
                    <td>{inv.phone}</td>
                    <td>{inv.amount} ₪</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* جدول الإشعارات الواصلة من تطبيق البنك */}
        <div className={styles.tableWrapper}>
          <h3 className={styles.tableTitle}><i className="fas fa-comment-dollar"></i> إشعارات البنك (Live)</h3>
          <div className={styles.scrollableTable} style={{ maxHeight: '300px' }}>
            <table className={styles.verificationTable}>
              <thead>
                <tr><th>الاسم من الإشعار</th><th>المبلغ</th><th>الوقت</th></tr>
              </thead>
              <tbody>
                {bankNotifications.map(notif => (
                  <tr key={notif.id}>
                    <td>{notif.sender}</td>
                    <td><strong>{notif.amount} ₪</strong></td>
                    <td style={{ fontSize: '12px', color: '#888' }}>{notif.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* تقرير المطابقة التلقائي */}
      {/* <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>تقرير المطابقة والتحصيل الذكي</span>
        </div>
        <div className={styles.cardBody}>
          <div className={`${styles.matchResult} ${stats.totalRequired === stats.totalReceived ? styles.successMatch : styles.failMatch}`}>
            <h3>
              {stats.totalRequired === stats.totalReceived ? 
                <><i className="fas fa-check-circle textSuccess"></i> متطابق كلياً</> : 
                <><i className="fas fa-info-circle textDanger"></i> هناك فروقات بحاجة لمراجعة</>
              }
            </h3>
            
            <table className={styles.resultTable}>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>رقم الجوال</th>
                  <th>المبلغ المطلوب</th>
                  <th>المبلغ المدفوع</th>
                  <th>الحالة</th>
                  <th>ملاحظة</th>
                </tr>
              </thead>
<tbody>
  {matchingReport.map(report => (
    <tr key={report.id}>
      <td>{report.name}</td>
      <td>{report.phone}</td> 
      <td>{report.amount} ₪</td>
      <td>{report.paid || 0} ₪</td>
      <td>
        <span className={`${styles.badge} ${
          report.status === 'success' ? styles.badgeGreen : 
          report.status === 'partial' ? styles.badgeYellow : styles.badgeRed
        }`}>
          {report.status === 'success' ? 'مكتمل' : report.status === 'partial' ? 'جزئي' : 'غير مدفوع'}
        </span>
      </td>
      <td className={styles.reasonText}>{report.reason}</td>
       <td className={styles.textCenter}>
        <button 
          className={styles.rowDeleteBtn} 
          onClick={() => handleDelete(report.id)}
          title="حذف السجل"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default UserVerify;