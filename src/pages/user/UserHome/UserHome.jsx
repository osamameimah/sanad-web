import React, { useState } from 'react';
import styles from './UserHome.module.css';
import Breadcrumb from "./../../../components/Breadcrumb/Breadcrumb";
import StatCard from '../../../components/User/HomeUser/StatCard/StatCard';
import HistoryTable from '../../../components/User/HomeUser/HistoryTable/HistoryTable';
import PackageModal from '../../../components/User/HomeUser/PackageModal/PackageModal';
import ConfirmModal from '../../../components/User/HomeUser/ConfirmModal/ConfirmModal';
 

const UserHome = () => {
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const [userData, setUserData] = useState({
    name: "أسامة ميمة",
    currentPackage: "الباقة الاحترافية",
    joinDate: "2023-05-05",
    monthlyCost: 150,
    status: "نشط",
    history: [
      { id: 1, date: "2024-01-01", package: "الاحترافية", amount: 150, status: "مدفوع" },
      { id: 2, date: "2023-12-01", package: "الاحترافية", amount: 150, status: "مدفوع" },
    ]
  });

  const showToast = (msg, type = "success") => {
    setNotification({ show: true, message: msg, type: type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const handleSelectPackage = (pkg) => {
    if (pkg.name === userData.currentPackage) return;
    setUserData(prev => ({ ...prev, currentPackage: pkg.name, monthlyCost: pkg.price }));
    setIsPkgModalOpen(false);
    showToast(`تم تغيير الباقة إلى ${pkg.name} بنجاح!`);
  };

  const handleConfirmCancel = () => {
    setUserData(prev => ({ ...prev, status: "ملغي" }));
    setIsConfirmModalOpen(false);
    showToast("تم إلغاء الاشتراك بنجاح", "error");
  };

  return (
    <>
      <Breadcrumb content="الرئيسية" />
      
      {notification.show && (
        <div className={`${styles.toast} ${styles[notification.type]}`}>
          <i className={notification.type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle"}></i>
          {notification.message}
        </div>
      )}

      <div className={styles.container}>
        <header className={styles.headerSection}>
          <div className={styles.profileCard}>
            <div className={styles.profileAvatar}>{userData.name.split(' ').map(n => n[0]).join('')}</div>
            <div className={styles.profileInfo}>
              <h1>مرحباً، {userData.name.split(' ')[0]} 👋</h1>
              <p>سعيدون برؤيتك مرة أخرى في لوحة التحكم</p>
            </div>
          </div>
          <button className={styles.btnCancel} onClick={() => setIsConfirmModalOpen(true)}>
            <i className="fas fa-user-slash"></i> إيقاف الاشتراك
          </button>
        </header>

        <div className={styles.statsGrid}>
          <StatCard label="الباقة الحالية" value={userData.currentPackage} icon="fa-box-open" accent onEdit={() => setIsPkgModalOpen(true)} />
          <StatCard label="تاريخ الاشتراك" value={userData.joinDate} icon="fa-calendar-check" />
          <StatCard label="التكلفة الشهرية" value={`${userData.monthlyCost} ₪`} icon="fa-shekel-sign" />
          <StatCard label="حالة الحساب" value={userData.status} icon="fa-check-circle" isStatus statusType={userData.status} />
        </div>

        <HistoryTable history={userData.history} />
      </div>

      {isPkgModalOpen && <PackageModal currentPackage={userData.currentPackage} onClose={() => setIsPkgModalOpen(false)} onSelect={handleSelectPackage} />}
      {isConfirmModalOpen && <ConfirmModal onClose={() => setIsConfirmModalOpen(false)} onConfirm={handleConfirmCancel} />}
    </>
  );
};

export default UserHome;