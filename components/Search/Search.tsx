import React from 'react';
// Styles
import styles from './Search.module.css';
// Types
type SearchProps = {
    keyword: string;
    setKeyword: (keyword: string) => void;
    refresh: boolean;
    setRefresh: (refresh: boolean) => void;
}

const Search = ({ keyword, setKeyword, refresh, setRefresh }: SearchProps) => {
    return (
        <div className={styles.search}>
            <input
                type="text"
                placeholder="Search..."
                value={keyword}
                className={styles.search__input}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={() => setRefresh(!refresh)} className={styles.search__button}>
                <i className="fas fa-search"></i>
            </button>
        </div>
    )
}

export default Search