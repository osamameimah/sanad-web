 import React, { useState, useMemo } from 'react';
import styles from './Packages.module.css';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PackageTable from '../../../components/Admin/Packages/PackageTable/PackageTable';
import PackageModals from '../../../components/Admin/Packages/PackageModals/PackageModals';
import Toast from '../../../components/Admin/Packages/Toast/Toast';
 

const INITIAL_PACKAGES = [
    { id: 1, name: 'باقة الأعمال الممتازة', price: '199', subscribers: '55', type: 'pro', label: 'احترافية', features: ['دعم 24/7', 'تقارير متقدمة'] },
    { id: 2, name: 'باقة أساسية', price: '99', subscribers: '120', type: 'basic', label: 'أساسية', features: ['دعم فني'] },
    // ... بقية البيانات
];

const Packages = () => {
    const [bills, setBills] = useState(INITIAL_PACKAGES);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    // حالات المودالات
    const [addModal, setAddModal] = useState(false);
    const [viewModal, setViewModal] = useState({ open: false, data: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, targetId: null });
    const [editModal, setEditModal] = useState({ open: false, data: null });

    const showToast = (msg, type = 'success') => {
        setNotification({ show: true, message: msg, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const getLabelByType = (type) => (type === 'pro' ? 'احترافية' : type === 'premium' ? 'مميزة' : 'أساسية');

    const handleAddSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const features = formData.get('features').split('،').map(f => f.trim()).filter(f => f);
        const newPkg = {
            id: Date.now(),
            name: formData.get('name'),
            price: formData.get('price'),
            type: formData.get('type'),
            label: getLabelByType(formData.get('type')),
            features,
            subscribers: '0'
        };
        setBills([newPkg, ...bills]);
        setAddModal(false);
        showToast("تم إضافة الباقة بنجاح");
    };

    const handleEditSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updated = {
            ...editModal.data,
            name: formData.get('name'),
            price: formData.get('price'),
            type: formData.get('type'),
            label: getLabelByType(formData.get('type')),
            features: formData.get('features').split('،').map(f => f.trim()).filter(f => f)
        };
        setBills(prev => prev.map(b => b.id === updated.id ? updated : b));
        setEditModal({ open: false, data: null });
        showToast("تم تحديث البيانات بنجاح");
    };

    const confirmDelete = () => {
        setBills(prev => prev.filter(b => b.id !== deleteModal.targetId));
        setDeleteModal({ open: false, targetId: null });
        showToast("تم حذف الباقة", "error");
    };

    const filteredData = useMemo(() => {
        return bills.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, bills]);

    return (
        <div className={styles.container}>
            <Breadcrumb content="الباقات" />
            
            {notification.show && <Toast message={notification.message} type={notification.type} />}

            <div className={styles.headerActions}>
                <button className={styles.fullAddBtn} onClick={() => setAddModal(true)}>
                    <i className="fas fa-plus"></i> إضافة باقة
                </button>
                <div className={styles.fullSearchWrapper}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    <input 
                        className={styles.fullSearchInput} 
                        placeholder="ابحث عن باقة..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <PackageTable 
                data={filteredData} 
                onView={(pkg) => setViewModal({ open: true, data: pkg })}
                onEdit={(pkg) => setEditModal({ open: true, data: pkg })}
                onDelete={(id) => setDeleteModal({ open: true, targetId: id })}
            />

            <PackageModals 
                addModal={addModal} setAddModal={setAddModal}
                viewModal={viewModal} setViewModal={setViewModal}
                editModal={editModal} setEditModal={setEditModal}
                deleteModal={deleteModal} setDeleteModal={setDeleteModal}
                onAddSave={handleAddSave} onEditSave={handleEditSave} onConfirmDelete={confirmDelete}
            />
        </div>
    );
};

export default Packages;