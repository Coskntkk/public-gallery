import React from 'react';
// Styles
import styles from './Pagination.module.css';
// Types
type PaginationProps = {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}
const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
    return (
        <div className={styles.pagination}>
            <button
                className={styles.pagination__button}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Previous
            </button>
            <span className={styles.pagination__page}>
                {currentPage} of {totalPages}
            </span>
            <button
                className={styles.pagination__button}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination