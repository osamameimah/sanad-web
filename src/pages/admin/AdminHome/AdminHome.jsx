 import React from 'react';
import styles from './AdminHome.module.css';
import cardStyles from '../../../components/Admin/AdminHome/StatCard/StatCard.module.css'; // استيراد ستايل البطاقات للوصول لكلاسات الألوان
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import StatCard from '../../../components/Admin/AdminHome/StatCard/StatCard';
 
const AdminHome = () => {
  const statsData = [
    { id: 1, label: 'إجمالي المشتركين', value: '1,250', icon: 'fas fa-users', colorClass: cardStyles.blueCard },
    { id: 2, label: 'طلبات الاشتراك', value: '15', icon: 'fas fa-bell', colorClass: cardStyles.yellowCard },
    { id: 3, label: 'إجمالي المدفوعات (شيكل)', value: '75,420', icon: 'fas fa-coins', colorClass: cardStyles.greenCard },
    { id: 4, label: 'عدد الباقات', value: '8', icon: 'fas fa-box', colorClass: cardStyles.redCard },
  ];

  return (
    <>
      <Breadcrumb content="الرئيسية" />

      <div className={styles.statsGrid}>
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            colorClass={stat.colorClass}
          />
        ))}
      </div>
    </>
  );
};

export default AdminHome;