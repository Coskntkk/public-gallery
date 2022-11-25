import React from 'react';
// Next
import { useRouter } from 'next/router';
// Styles
import styles from './Final.module.css';
// Types
type FinalProps = {
    image: string;
    imageId: string;
    redirectUrl: string;
    resetCreateHandler: () => void;
};

const Final = ({ image, imageId, redirectUrl, resetCreateHandler }: FinalProps) => {
    // Hooks
    const router = useRouter();

    return (
        <div className={styles.final}>
            <h1>Congratulations!</h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={"ScreenShot"} className={styles.final__image} />
            <p className={styles.final__content__text}>Your art has been posted!</p>
            <button className={styles.final__btn} onClick={() => router.push(redirectUrl)}>View</button>
            <button className={styles.final__btn} onClick={() => router.push('/gallery')}>Explore Gallery</button>
            <button className={styles.final__btn} onClick={resetCreateHandler}>Create Another</button>
            <br />
            <a
                className={styles.final__tweet__btn}
                href={"https://twitter.com/intent/tweet?text=" + `I just created an artwork on Public Gallery! Check it out! ` + `&url=https://100px-gallery.vercel.app/gallery/${imageId} ` + "&hashtags=pixelart,publicgallery"}
                target="_blank"
                rel="noreferrer"
                data-size="large"
            >
                <i className="fa-brands fa-twitter"></i>
                Tweet
            </a>
        </div>
    )
}

export default Final