import React from 'react';
// Styles
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.loading}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="./loading.gif" alt="Loading" className={styles.loading__image} />
            <h1>Loading...</h1>
        </div>
    )
}

export default Loading