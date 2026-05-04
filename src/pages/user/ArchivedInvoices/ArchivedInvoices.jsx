 import React, { useState, useEffect, useCallback } from 'react';
import styles from './ArchivedInvoices.module.css';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

 import FilterBar from '../../../../src/components/User/ArchivedInvoices/FilterBar/FilterBar';
import InvoiceTable from '../../../components/User/ArchivedInvoices/InvoiceTable/InvoiceTable';
import WelcomeState from '../../../components/User/ArchivedInvoices/WelcomeState/WelcomeState';

const months = [
    { v: '01', l: 'يناير' }, { v: '02', l: 'فبراير' }, { v: '03', l: 'مارس' },
    { v: '04', l: 'أبريل' }, { v: '05', l: 'مايو' }, { v: '06', l: 'يونيو' },
    { v: '07', l: 'يوليو' }, { v: '08', l: 'أغسطس' }, { v: '09', l: 'سبتمبر' },
    { v: '10', l: 'أكتوبر' }, { v: '11', l: 'نوفمبر' }, { v: '12', l: 'ديسمبر' }
];

const ArchivedInvoices = () => {
    const [isFiltered, setIsFiltered] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(handler);
    }, [search]);

    const fetchInvoices = useCallback(async (reset = false) => {
        if (loading) return;
        setLoading(true);
        const currentPage = reset ? 1 : page;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 600));

            const mockBatch = Array.from({ length: 20 }).map((_, i) => ({
                id: `INV-${month || '00'}-${day || '00'}-${Math.floor(Math.random() * 9000)}`,
                customer: debouncedSearch ? `${debouncedSearch}` : `عميل أرشيف ${i + (currentPage * 20)}`,
                amount: (Math.random() * 1000).toFixed(2),
                date: `2026-${month || '01'}-${day || '01'}`,
            }));

            if (reset) {
                setInvoices(mockBatch);
                setPage(2);
                setHasMore(true);
            } else {
                setInvoices(prev => [...prev, ...mockBatch]);
                setPage(prev => prev + 1);
            }
            if (mockBatch.length < 20) setHasMore(false);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }, [month, day, debouncedSearch, page, loading]);

    useEffect(() => {
        if (!month && !debouncedSearch) {
            setInvoices([]);
            setIsFiltered(false);
            return;
        }
        setIsFiltered(true);
        fetchInvoices(true);
    }, [month, day, debouncedSearch]);

    return (
        <div className={styles.container}>
            <Breadcrumb content="كافة الفواتير المؤرشفة" />

            <FilterBar 
                month={month} setMonth={setMonth}
                day={day} setDay={setDay}
                search={search} setSearch={setSearch}
                loading={loading} months={months}
            />

            {!isFiltered ? (
                <WelcomeState />
            ) : (
                <>
                    <div className={styles.statsBar}>
                        تم العثور على <strong>{invoices.length}</strong> فاتورة
                    </div>
                    
                    <InvoiceTable 
                        invoices={invoices} 
                        loading={loading} 
                        hasMore={hasMore} 
                        onLoadMore={() => fetchInvoices(false)} 
                    />
                </>
            )}
        </div>
    );
};

export default ArchivedInvoices;