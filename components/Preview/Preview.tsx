import React from 'react';
// Styles
import styles from './Preview.module.css';
// Types
type PreviewProps = {
    image: string;
    form: {
        name: string;
        description: string;
        author: string;
    };
    setForm: (form: { name: string; description: string; author: string; }) => void;
    handleFinish: ( e : React.FormEvent<HTMLFormElement>) => void;
};

const Preview = ({ image, form, setForm, handleFinish }: PreviewProps) => {
    return (
        <div className={styles.preview}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={"ScreenShot"} className={styles.image} />
            <form className={styles.complete__form} onSubmit={handleFinish}>
                <div className={styles.complete__form__group}>
                    <label htmlFor="name">What is the name of your art? (optional)</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={styles.complete__form__input}
                    />
                </div>
                <div className={styles.complete__form__group}>
                    <label htmlFor="description">Describe your art (optional)</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className={styles.complete__form__input}
                        rows={4}
                        maxLength={200}
                    />
                </div>
                <div className={styles.complete__form__group}>
                    <label htmlFor="author">Who are you? (optional)</label>
                    <input
                        type="text" value={form.author}
                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                        className={styles.complete__form__input}
                    />
                </div>
                <button className={styles.complete__btn} type="submit">Post</button>
            </form>
        </div>
    )
}

export default Preview