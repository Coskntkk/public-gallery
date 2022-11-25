import React from 'react';
// Next
import Image from 'next/image';
// Styles
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.loading}>
            <Image src="/loading.gif" alt="Loading" className={styles.loading__image} width={240} height={240} />
            <h1>Loading...</h1>
        </div>
    )
}

export default Loading