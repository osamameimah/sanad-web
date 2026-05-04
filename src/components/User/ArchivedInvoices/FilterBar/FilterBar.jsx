import React from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({ month, setMonth, day, setDay, search, setSearch, loading, months }) => {
    return (
        <div className={styles.filterWrapper}>
            <div className={styles.filterItem}>
                <label>الشهر التاريخي</label>
                <select value={month} onChange={(e) => { setMonth(e.target.value); setDay(''); }}>
                    <option value="">اختر الشهر...</option>
                    {months.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
                </select>
            </div>

            <div className={`${styles.filterItem} ${!month && styles.disabled}`}>
                <label>اليوم المحدد</label>
                <select value={day} disabled={!month} onChange={(e) => setDay(e.target.value)}>
                    <option value="">كل أيام الشهر</option>
                    {Array.from({ length: 31 }, (_, i) => {
                        const d = (i + 1).toString().padStart(2, '0');
                        return <option key={d} value={d}>{d}</option>;
                    })}
                </select>
            </div>

            <div className={styles.filterItem}>
                <label>بحث باسم العميل (تلقائي)</label>
                <div className={styles.searchWrapper}>
                    <input 
                        type="text" 
                        placeholder="اكتب اسم العميل للبحث..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-search'}`}></i>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;