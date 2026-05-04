import React, { useState, useMemo } from 'react';
import styles from './AddBills.module.css';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import BillStats from '../../../../src/components/User/BillComponents/BillStats/BillStats';
import BillTable from '../../../../src/components/User/BillComponents/BillTable/BillTable';
import BillModals from '../../../../src/components/User/BillComponents/BillModal/BillModal';

const INITIAL_PACKAGES = [  
    { id: 1, name: 'اسامة ميمة', phone: '0599000000', price: '200', date: '2026-03-11' },
    { id: 2, name: 'باقة الأعمال', phone: '0598000000', price: '300', date: '2026-03-10' },
    { id: 3, name: 'الباقة الذهبية', phone: '0597000000', price: '500', date: '2026-03-09' },
];

const AddBills = () => {
    const [bills, setBills] = useState(INITIAL_PACKAGES);
    const [searchTerm, setSearchTerm] = useState('');
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ open: false, targetId: null });
    const [editModal, setEditModal] = useState({ open: false, data: null });
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const showToast = (msg, type = 'success') => {
        setNotification({ show: true, message: msg, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const handleAddSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newBill = { id: Date.now(), name: formData.get('name'), phone: formData.get('phone'), price: formData.get('price'), date: new Date().toISOString().split('T')[0] };
        setBills([newBill, ...bills]);
        setAddModal(false);
        showToast("تم إضافة الفاتورة بنجاح", "success");
    };

    const confirmDelete = () => {
        setBills(prev => prev.filter(b => b.id !== deleteModal.targetId));
        setDeleteModal({ open: false, targetId: null });
        showToast("تم حذف الفاتورة بنجاح", "error");
    };

    const handleEditSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = { ...editModal.data, name: formData.get('name'), phone: formData.get('phone'), price: formData.get('price') };
        setBills(prev => prev.map(b => b.id === updatedData.id ? updatedData : b));
        setEditModal({ open: false, data: null });
        showToast("تم تحديث البيانات بنجاح", "success");
    };

    const filteredSubscribers = useMemo(() => {
        const lowerTerm = searchTerm.toLowerCase().trim();
        return bills.filter(p => p.name.toLowerCase().includes(lowerTerm) || p.phone.includes(lowerTerm) || p.price.toString().includes(lowerTerm));
    }, [searchTerm, bills]);

    return (
        <div className={styles.container}>
            <Breadcrumb content="إضافة فاتورة" />

            {notification.show && (
                <div className={`${styles.toast} ${styles[notification.type]}`}>
                    <i className={notification.type === 'success' ? 'fas fa-check-circle' : 'fas fa-trash'}></i>
                    {notification.message}
                </div>
            )}

            <div className={styles.headerActions}>
                <div className={styles.topRow}>
                    <button className={styles.fullAddBtn} onClick={() => setAddModal(true)}>
                        <i className="fas fa-plus"></i>
                        <span>إضافة فاتورة جديدة</span>
                    </button>
                    <BillStats totalBills={bills.length} />
                </div>

                <div className={styles.fullSearchWrapper}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    <input
                        type="text"
                        placeholder="ابحث عن اسم، رقم جوال، أو مبلغ..."
                        className={styles.fullSearchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className={styles.clearSearch} onClick={() => setSearchTerm('')}>
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div> 
            </div>

            <BillTable 
                data={filteredSubscribers} 
                onEdit={(pkg) => setEditModal({ open: true, data: pkg })}
                onDelete={(id) => setDeleteModal({ open: true, targetId: id })}
            />

            <BillModals 
                addModal={addModal} setAddModal={setAddModal} handleAddSave={handleAddSave}
                editModal={editModal} setEditModal={setEditModal} handleEditSave={handleEditSave}
                deleteModal={deleteModal} setDeleteModal={setDeleteModal} confirmDelete={confirmDelete}
            />
        </div>
    );
};

export default AddBills;