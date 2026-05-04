 import React, { useState, useMemo } from 'react';
import styles from './Requests.module.css';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import Toast from '../../../components/Admin/Requests/Toast/Toast';
import RequestTable from '../../../components/Admin/Requests/RequestsTable/RequestsTable';
import RequestModals from '../../../components/Admin/Requests/RequestModals/RequestModals';
import ApproveModal from '../../../components/Admin/Requests/ApproveModal/ApproveModal';

// استيراد المكونات الفرعية
 

const INITIAL_REQUESTS = [
    { id: 1, name: 'اسامة ميمة', phone: '0599000000', company: 'سند للبرمجيات', package: 'أساسية', daysJoined: 30, type: 'basic', label: 'أساسية' },
    { id: 2, name: 'باقة الأعمال', phone: '0598000000', company: 'الواحة للبناء', package: 'متقدمة', daysJoined: 60, type: 'pro', label: 'متقدمة' },
    { id: 3, name: 'الباقة الذهبية', phone: '0597000000', company: 'شركة سلاش', package: 'مميزة', daysJoined: 90, type: 'premium', label: 'مميزة' },
];

const Requests = () => {
    const [requests, setRequests] = useState(INITIAL_REQUESTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    // حالات المودالات
    const [modals, setModals] = useState({
        add: false,
        edit: { open: false, data: null },
        delete: { open: false, id: null },
        approve: { open: false, data: null }
    });

    const showToast = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const filteredRequests = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        return requests.filter(r => 
            r.name.toLowerCase().includes(term) || 
            r.company.toLowerCase().includes(term) ||
            r.phone.includes(term)
        );
    }, [searchTerm, requests]);

    // العمليات (CRUD)
    const handleSave = (data, isEdit) => {
        if (isEdit) {
            setRequests(prev => prev.map(r => r.id === data.id ? data : r));
            showToast("تم تحديث البيانات بنجاح");
        } else {
            setRequests([{ ...data, id: Date.now() }, ...requests]);
            showToast("تم إضافة الطلب بنجاح");
        }
    };

    return (
        <div className={styles.container}>
            <Breadcrumb content="طلبات الاشتراك" />
            
            {notification.show && <Toast message={notification.message} type={notification.type} />}

            <div className={styles.headerActions}>
                                <button className={styles.fullAddBtn} onClick={() => setModals({...modals, add: true})}>
                    <i className="fas fa-plus"></i> إضافة طلب
                </button>
                <div className={styles.fullSearchWrapper}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    <input 
                        type="text" placeholder="ابحث في الطلبات..." 
                        className={styles.fullSearchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
 
            </div>

            <RequestTable 
                data={filteredRequests}
                onApprove={(req) => setModals({...modals, approve: { open: true, data: req }})}
                onEdit={(req) => setModals({...modals, edit: { open: true, data: req }})}
                onDelete={(id) => setModals({...modals, delete: { open: true, id }})}
            />

            {/* المودالات المنفصلة */}
            <RequestModals 
                modals={modals} 
                setModals={setModals} 
                onSave={handleSave} 
                onConfirmDelete={(id) => {
                    setRequests(prev => prev.filter(r => r.id !== id));
                    showToast("تم حذف الطلب", "error");
                }}
            />

            {modals.approve.open && (
                <ApproveModal 
                    data={modals.approve.data}
                    onClose={() => setModals({...modals, approve: { open: false, data: null }})}
                    onConfirm={(id) => {
                        setRequests(prev => prev.filter(r => r.id !== id));
                        showToast("تم تفعيل الحساب بنجاح");
                    }}
                />
            )}
        </div>
    );
};

export default Requests;