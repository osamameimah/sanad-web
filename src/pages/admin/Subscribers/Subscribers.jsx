 import React, { useState, useMemo } from 'react';
import styles from './Subscribers.module.css';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import Toast from '../../../components/Admin/Subscribers/Toast/Toast';
import SubscribersTable from '../../../components/Admin/Subscribers/SubscribersTable/SubscribersTable';
import SubscriptionsHistoryModal from '../../../components/Admin/Subscribers/SubscriptionsHistoryModal/SubscriptionsHistoryModal';
import RenewModal from '../../../components/Admin/Subscribers/RenewModal/RenewModal';
import AddEditModal from '../../../components/Admin/Subscribers/AddEditModal/AddEditModal';
import DeleteModal from '../../../components/Admin/Subscribers/DeleteModal/DeleteModal';

 

const INITIAL_SUBSCRIBERS = [
    { id: 1, name: 'اسامة ميمة', phone: '0599000000', email: 'osamameimah@gmail.com', password: '059960331', company: 'سند للبرمجيات', package: 'أساسية', daysJoined: 30, daysLeft: 5, type: 'basic', label: 'أساسية' },
    { id: 2, name: 'باقة الأعمال', phone: '0598000000', email: 'business@alwaha.com', password: 'alwaha123', company: 'الواحة للبناء', package: 'متقدمة', daysJoined: 60, daysLeft: 12, type: 'pro', label: 'متقدمة' },
    { id: 3, name: 'الباقة الذهبية', phone: '0597000000', email: 'info@slash.com', password: 'slash456', company: 'شركة سلاش', package: 'مميزة', daysJoined: 90, daysLeft: 45, type: 'premium', label: 'مميزة' },
];

const SUBSCRIPTIONS_HISTORY = {
    1: [
        { id: 1, date: '2024-01-01', period: 30, amount: 150, type: 'basic', status: 'منتهي' },
        { id: 2, date: '2024-02-01', period: 30, amount: 150, type: 'basic', status: 'منتهي' },
        { id: 3, date: '2024-03-01', period: 30, amount: 150, type: 'basic', status: 'نشط' },
    ],
    2: [
        { id: 1, date: '2024-01-15', period: 60, amount: 280, type: 'pro', status: 'منتهي' },
        { id: 2, date: '2024-03-15', period: 60, amount: 280, type: 'pro', status: 'نشط' },
    ],
    3: [
        { id: 1, date: '2023-12-01', period: 90, amount: 500, type: 'premium', status: 'منتهي' },
        { id: 2, date: '2024-03-01', period: 90, amount: 500, type: 'premium', status: 'نشط' },
    ],
};

const getLabelByType = (type) => {
    if (type === 'pro') return 'متقدمة';
    if (type === 'premium') return 'مميزة';
    return 'أساسية';
};

const Subscribers = () => {
    const [subscribers, setSubscribers] = useState(INITIAL_SUBSCRIBERS);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState({ open: false, data: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, targetId: null });
    const [renewModal, setRenewModal] = useState({ open: false, data: null });
    const [subscriptionsModal, setSubscriptionsModal] = useState({ open: false, data: null });

    // Renew state
    const [renewPeriod, setRenewPeriod] = useState('30');
    const [customDays, setCustomDays] = useState('');

    // Toast state
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const showToast = (msg, type = 'success') => {
        setNotification({ show: true, message: msg, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    // Handlers
    const handleAddSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const days = parseInt(formData.get('daysJoined'));
        const newSubscriber = {
            id: Date.now(),
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            password: formData.get('password'),
            company: formData.get('company'),
            type: formData.get('type'),
            label: getLabelByType(formData.get('type')),
            daysJoined: days,
            daysLeft: days,
        };
        setSubscribers(prev => [newSubscriber, ...prev]);
        setAddModal(false);
        showToast('تم إضافة المشترك بنجاح');
    };

    const handleEditSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = {
            ...editModal.data,
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            password: formData.get('password'),
            company: formData.get('company'),
            type: formData.get('type'),
            label: getLabelByType(formData.get('type')),
            daysJoined: parseInt(formData.get('daysJoined')),
        };
        setSubscribers(prev => prev.map(b => b.id === updatedData.id ? updatedData : b));
        setEditModal({ open: false, data: null });
        showToast('تم تحديث البيانات بنجاح');
    };

    const confirmRenew = () => {
        const daysToAdd = renewPeriod === 'custom' ? parseInt(customDays || 0) : parseInt(renewPeriod);
        if (daysToAdd <= 0) { showToast('يرجى تحديد فترة صحيحة', 'error'); return; }
        setSubscribers(prev => prev.map(b =>
            b.id === renewModal.data.id ? { ...b, daysLeft: parseInt(b.daysLeft) + daysToAdd } : b
        ));
        showToast(`تم تجديد الاشتراك لـ ${renewModal.data.name} بنجاح`);
        setRenewModal({ open: false, data: null });
        setRenewPeriod('30');
        setCustomDays('');
    };

    const confirmDelete = () => {
        setSubscribers(prev => prev.filter(b => b.id !== deleteModal.targetId));
        setDeleteModal({ open: false, targetId: null });
        showToast('تم حذف المشترك', 'error');
    };

    const filteredSubscribers = useMemo(() => {
        const lowerTerm = searchTerm.toLowerCase().trim();
        return subscribers.filter(p =>
            p.name.toLowerCase().includes(lowerTerm) ||
            p.company.toLowerCase().includes(lowerTerm) ||
            p.phone.includes(lowerTerm)
        );
    }, [searchTerm, subscribers]);

    const getSubscriptions = (id) => SUBSCRIPTIONS_HISTORY[id] || [];

    return (
        <div className={styles.container}>
            <Breadcrumb content="إدارة المشتركين" />

            <Toast
                show={notification.show}
                message={notification.message}
                type={notification.type}
            />

            <div className={styles.headerActions}>
                <button className={styles.addBtn} onClick={() => setAddModal(true)}>
                    <i className="fas fa-user-plus"></i>
                    <span>إضافة مشترك جديد</span>
                </button>
                <div className={styles.searchWrapper}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    <input
                        type="text"
                        placeholder="ابحث بالاسم، الشركة أو الجوال..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <SubscribersTable
                subscribers={filteredSubscribers}
                onEdit={(pkg) => setEditModal({ open: true, data: pkg })}
                onDelete={(id) => setDeleteModal({ open: true, targetId: id })}
                onRenew={(pkg) => setRenewModal({ open: true, data: pkg })}
                onHistory={(pkg) => setSubscriptionsModal({ open: true, data: pkg })}
                getSubscriptionsCount={(id) => getSubscriptions(id).length}
            />

            {subscriptionsModal.open && (
                <SubscriptionsHistoryModal
                    data={subscriptionsModal.data}
                    subscriptions={getSubscriptions(subscriptionsModal.data?.id)}
                    onClose={() => setSubscriptionsModal({ open: false, data: null })}
                    onRenew={() => {
                        const sub = subscriptionsModal.data;
                        setSubscriptionsModal({ open: false, data: null });
                        setRenewModal({ open: true, data: sub });
                    }}
                />
            )}

            {renewModal.open && (
                <RenewModal
                    data={renewModal.data}
                    renewPeriod={renewPeriod}
                    customDays={customDays}
                    onPeriodChange={setRenewPeriod}
                    onCustomDaysChange={setCustomDays}
                    onConfirm={confirmRenew}
                    onClose={() => {
                        setRenewModal({ open: false, data: null });
                        setRenewPeriod('30');
                        setCustomDays('');
                    }}
                />
            )}

            {addModal && (
                <AddEditModal
                    mode="add"
                    data={null}
                    onSave={handleAddSave}
                    onClose={() => setAddModal(false)}
                />
            )}

            {editModal.open && (
                <AddEditModal
                    mode="edit"
                    data={editModal.data}
                    onSave={handleEditSave}
                    onClose={() => setEditModal({ open: false, data: null })}
                />
            )}

            {deleteModal.open && (
                <DeleteModal
                    onConfirm={confirmDelete}
                    onClose={() => setDeleteModal({ open: false, targetId: null })}
                />
            )}
        </div>
    );
};

export default Subscribers;