import React, { useState, createRef } from 'react'
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
// Styles
import styles from './Create.module.css'
// Components
import Pixel from '../Pixel/Pixel';
import Palette from '../Palette/Palette';
// Services
import UploadService from '../../services/UploadService';

const Create = () => {
    // Hooks
    const ref = createRef();
    const router = useRouter();
    // States
    const [image, setImage] = useState(null);
    const [currentColor, setCurrentColor] = useState('#000000');
    const [pixels, setPixels] = useState(new Array(100).fill('#ffffff'));
    const [isCreating, setIsCreating] = useState(true);
    const [form, setForm] = useState({ name: '', description: '', author: '' });
    // Handlers
    const handleComplete = () => {
        setIsCreating(false);
        html2canvas(ref.current, {}).then((canvas) => {
            setImage(canvas.toDataURL());
        });
    };
    const handleFinish = (e) => {
        e.preventDefault();
        let formData = {
            name: form.name ? form.name : 'Untitled',
            description: form.description ? form.description : 'No description',
            author: form.author ? form.author : 'Anonymous',
            image,
        };
        UploadService.uploadImage(formData)
            .then((response) => {
                console.log(response);
                let url = "/gallery/" + response.data;
                router.push(url);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={styles.create}>
            {isCreating && (
                <>
                    <div className={styles.canvas} ref={ref}>
                        {pixels.map((pixel, index) => (
                            <Pixel key={index} currentColor={currentColor} pixel={pixel} pixels={pixels} setPixels={setPixels} index={index} isCreating={isCreating} />
                        ))}
                    </div>
                    <Palette setCurrentColor={setCurrentColor} setPixels={setPixels} />
                    <div className={styles.complete}>
                        <button className={styles.complete__btn} onClick={handleComplete}>Complete</button>
                    </div>
                </>
            )}
            {!isCreating && (
                <>
                    <img src={image} alt={"ScreenShot"} />
                    <form className={styles.complete__form} onSubmit={handleFinish}>
                        <div className={styles.complete__form__group}>
                            <label htmlFor="name">What is the name of your art?</label>
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
                                type="text" 
                                value={form.description} 
                                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                                className={styles.complete__form__input} 
                                rows={4} 
                                maxLength={200}
                            />
                        </div>
                        <div className={styles.complete__form__group}>
                            <label htmlFor="author">Who are you?</label>
                            <input
                                type="text" value={form.author}
                                onChange={(e) => setForm({ ...form, author: e.target.value })} 
                                className={styles.complete__form__input}
                            />
                        </div>
                        <div className={styles.complete}>
                            <button className={styles.complete__btn} type="submit">Post</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}

export default Create