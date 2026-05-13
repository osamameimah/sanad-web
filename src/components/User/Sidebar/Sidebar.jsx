import React, { useState, useMemo } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Users,
    UserPlus,
    LogOut,
    Menu,
    Archive,
    Receipt,
    FilePlus,
    FileCheck
} from 'lucide-react';
import styles from './Sidebar.module.css';

const MOCK_ADMIN = {
    id: "admin_001",
    name: "محمد العمري",
    email: "admin@safeqa.com",
    role: "super_admin",
    avatar: null,
};

const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);




    const handleLogout = () => {
        localStorage.removeItem("adminUser");
        navigate('/');
    };

    return (
        <div className={styles.adminLayout}>
            <button className={styles.menuBtn} onClick={() => setOpen(!open)}>
                <Menu size={24} />
            </button>

            <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <img src="/logo.jpeg" alt="Logo" className={styles.adminLogo} />
                    <h2 className={styles.adminTitle}>سند</h2>
                </div>

                <nav className={styles.navMenu} onClick={() => setOpen(false)}>
                    <NavLink to="home" className={({ isActive }) => isActive ? styles.active : ''}>
                        <LayoutDashboard className={styles.icon} size={20} />
                        <span className={styles.linkText}>الرئيسية</span>
                    </NavLink>

                    {/* <NavLink to="registerBills" className={({ isActive }) => isActive ? styles.active : ''}>
                        <Receipt className={styles.icon} size={20} />
                        <span className={styles.linkText}>سجل الفواتير اليومية</span>
                    </NavLink> */}
                    <NavLink to="addBills" className={({ isActive }) => isActive ? styles.active : ''}>
                        <FilePlus className={styles.icon} size={20} />
                        <span className={styles.linkText}>إضافة فاتورة</span>
                    </NavLink>

                    <NavLink to="validation" className={({ isActive }) => isActive ? styles.active : ''}>
                        <FileCheck className={styles.icon} size={20} />
                        <span className={styles.linkText}>المقارنات و التحقق</span>
                    </NavLink>

                    <NavLink to="archivedInvoices" className={({ isActive }) => isActive ? styles.active : ''}>
                        <Archive className={styles.icon} size={20} />
                        <span className={styles.linkText}>كافة الفواتير المؤرشفة</span>
                    </NavLink>

                    {/* <NavLink to="whatsappBoot" className={({ isActive }) => isActive ? styles.active : ''}>
                        <Users className={styles.icon} size={20} />
                        <span className={styles.linkText}>بوت الواتسأب</span>
                    </NavLink> */}
                </nav>



                <div className={styles.sidebarFooter}>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        <LogOut size={18} style={{ marginLeft: '8px' }} />
                        <span>تسجيل خروج</span>
                    </button>
                </div>
            </aside>

            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
};

export default Sidebar;