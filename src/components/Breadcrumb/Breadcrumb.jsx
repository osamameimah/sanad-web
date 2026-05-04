import styles from './Breadcrumb.module.css';
const Breadcrumb = ({ content }) => {
    return (
        <> 
        <div className={styles.Breadcrumb}>
            <div>
                لوحة التحكم / {content}
            </div>
        </div>
        </>
    );
}

export default Breadcrumb;