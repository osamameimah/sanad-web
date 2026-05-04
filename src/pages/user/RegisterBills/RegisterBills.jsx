 import React, { useState, useMemo, useEffect } from 'react';
import styles from './RegisterBills.module.css';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import BillTable from '../../../components/User/RigisterBills/BillTable/BillTable';
import BillModals from '../../../components/User/RigisterBills/BillModals/BillModals';
import Toast from '../../../components/User/RigisterBills/Toast/Toast';
 

const INITIAL_PACKAGES = [
    { id: 1, name: 'اسامة ميمة', senderaccount: '0599000000', price: '200', date: '2026-03-11',time:'09:09:55', paid: false },
    { id: 2, name: 'باقة الأعمال', senderaccount: '0598000000', price: '300', date: '2026-03-10',time:'09:09:55', paid: true },
    { id: 3, name: 'الباقة الذهبية', senderaccount: '0597000000', price: '500', date: '2026-03-09', paid: false },
    { id: 4, name: 'سند بريميوم', senderaccount: '0595000000', price: '150', date: '2026-03-08',time:'09:09:55', paid: true },
    { id: 5, name: 'مؤسسة الأمل', senderaccount: '0594000000', price: '1000', date: '2026-03-07',time:'09:09:55', paid: false },
    { id: 6, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 7, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 8, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 9, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06', time:'09:09:55',paid: true },
    { id: 10, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06', paid: true },
    { id: 11, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 12, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 13, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 14, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 15, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 16, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 17, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 18, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 19, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
    { id: 20, name: 'شركة البركة', senderaccount: '1084525', price: '450', date: '2026-03-06',time:'09:09:55', paid: true },
];

const RegisterBills = () => {
    const [bills, setBills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleItems, setVisibleItems] = useState(15);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);

    const [deleteModal, setDeleteModal] = useState({ open: false, targetId: null });
    const [editModal, setEditModal] = useState({ open: false, data: null });
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        setInitialLoading(true);
        const timer = setTimeout(() => {
            setBills(INITIAL_PACKAGES);
            setInitialLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    const showToast = (msg, type = 'success') => {
        setNotification({ show: true, message: msg, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const filteredAndSortedSubscribers = useMemo(() => {
        const lowerTerm = searchTerm.toLowerCase().trim();
        const filtered = bills.filter(p =>
            p.name.toLowerCase().includes(lowerTerm) ||
            p.senderaccount.includes(lowerTerm) ||
            p.price.toString().includes(lowerTerm)
        );
        return [...filtered].reverse();
    }, [searchTerm, bills]);

    const currentItems = filteredAndSortedSubscribers.slice(0, visibleItems);

    const handleLoadMore = () => {
        setLoadMoreLoading(true);
        setTimeout(() => {
            setVisibleItems(prev => prev + 20);
            setLoadMoreLoading(false);
        }, 600);
    };

    const confirmDelete = () => {
        setBills(prev => prev.filter(b => b.id !== deleteModal.targetId));
        setDeleteModal({ open: false, targetId: null });
        showToast("تم الحذف بنجاح", "error");
    };

    const handleEditSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = {
            ...editModal.data,
            name: formData.get('name'),
            senderaccount: formData.get('senderaccount'),
            price: formData.get('price')
        };
        setBills(prev => prev.map(b => b.id === updatedData.id ? updatedData : b));
        setEditModal({ open: false, data: null });
        showToast("تم تحديث البيانات");
    };

    return (
        <div className={styles.container}>
            <Breadcrumb content="سجل الفواتير اليومية" />

            {notification.show && <Toast notification={notification} />}

            <div className={styles.topSection}>
                <div className={styles.searchContainer}>
                    <div className={styles.fullSearchWrapper}>
                        <i className={`fas fa-search ${styles.searchIcon}`}></i>
                        <input
                            type="text"
                            placeholder="ابحث عن اسم، رقم جوال، أو مبلغ..."
                            className={styles.fullSearchInput}
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setVisibleItems(10); }}
                        />
                        {searchTerm && (
                            <button className={styles.clearSearch} onClick={() => setSearchTerm('')}>
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <BillTable 
                initialLoading={initialLoading} 
                currentItems={currentItems} 
                setEditModal={setEditModal} 
                setDeleteModal={setDeleteModal}
            />

            {visibleItems < filteredAndSortedSubscribers.length && (
                <div className={styles.loadMoreContainer}>
                    <button 
                        className={styles.loadMoreBtn} 
                        onClick={handleLoadMore} 
                        disabled={loadMoreLoading}
                    >
                        {loadMoreLoading ? "جاري التحميل..." : "عرض المزيد"}
                    </button>
                </div>
            )}

            <BillModals 
                deleteModal={deleteModal} 
                setDeleteModal={setDeleteModal}
                confirmDelete={confirmDelete}
                editModal={editModal}
                setEditModal={setEditModal}
                handleEditSave={handleEditSave}
            />
        </div>
    );
};

export default RegisterBills;