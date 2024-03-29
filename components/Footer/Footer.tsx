import React from 'react';
// Styles
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__links}>
                2022 @dimaetor
                <a href="https://github.com/Coskntkk">Github</a>
                <a href="https://github.com/Coskntkk/public-gallery">Repository</a>
                <a href="https://twitter.com/dimaetor">Twitter</a>
                <a href="https://www.buymeacoffee.com/coskntkk" target="_blank" rel="noreferrer" style={{color: "yellow"}}>Buy Me A Coffee</a>
            </div>
        </div>
    )
}

export default Footer