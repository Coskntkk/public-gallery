import React from 'react';
// Styles
import styles from './HomePage.module.css';
// Components
import Link from 'next/link';

const HomePage = () => {
    return (
        <div className={styles.homepage}>
            <h1 className={styles.title}>Public Gallery</h1>
            <img src="./logo.png" alt="Logo" />
            <p className={styles.description}>
                Public gallery is a place where you can create and share your 10x10 pixel art with the world. <br />
                You can also browse other people&apos;s arts. Have fun! <br />
                Click on the <Link href={"/gallery"} className={styles.link}>Gallery</Link> to see all the public pixel art. <br />
                Click on the <Link href={"/create"} className={styles.link}>Create</Link> to create your own pixel art. <br />
                After you create your pixel art, you can share it with the world.
            </p>
        </div>
    )
}

export default HomePage