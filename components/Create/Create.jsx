import React, { useState, createRef } from 'react'
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
// Styles
import styles from './Create.module.css'
import stylesShow from './Show.module.css'
import stylesFinal from './Final.module.css'
// Components
import Pixel from '../Pixel/Pixel';
import Palette from '../Palette/Palette';
import Loading from '../Loading/Loading';
// Services
import ArtifactService from '../../services/ArtifactService';

const Create = () => {
    // Hooks
    const ref = createRef();
    const router = useRouter();
    // States
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [currentColor, setCurrentColor] = useState('#000000');
    const [pixels, setPixels] = useState(new Array(100).fill('#ffffff'));
    const [isCreating, setIsCreating] = useState(true);
    const [form, setForm] = useState({ name: '', description: '', author: '' });
    const [redirectUrl, setRedirectUrl] = useState("null");
    const [imageId, setImageId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Variables
    // Handlers
    const handleComplete = () => {
        setLoading(true);
        setIsCreating(false);
        html2canvas(ref.current, {}).then((canvas) => {
            setImage(canvas.toDataURL());
            setLoading(false);
        });
    };
    const handleFinish = (e) => {
        e.preventDefault();
        setLoading(true);
        let formData = {
            name: form.name ? form.name : 'Untitled',
            description: form.description ? form.description : 'No description',
            author: form.author ? form.author : 'Anonymous',
            image,
        };
        ArtifactService.createArtifact(formData)
            .then((res) => {
                let itemId = res.data;
                let url = "/gallery/" + itemId;
                setRedirectUrl(url);
                setImageId(itemId);
                setIsModalOpen(true);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const resetCreateHandler = () => {
        setIsCreating(true);
        setIsModalOpen(false);
        setPixels(new Array(100).fill('#ffffff'));
        setForm({ name: '', description: '', author: '' });
    };
    return (
        loading ? <Loading /> :
        !isModalOpen
            ? <div className={styles.create}>
                {/* Drawing section  */}
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
                {/* Show and form section  */}
                {!isCreating && (<>
                    <img src={image} alt={"ScreenShot"} className={stylesShow.image} />
                    <form className={stylesShow.complete__form} onSubmit={handleFinish}>
                        <div className={stylesShow.complete__form__group}>
                            <label htmlFor="name">What is the name of your art? (optional)</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className={stylesShow.complete__form__input}
                            />
                        </div>
                        <div className={stylesShow.complete__form__group}>
                            <label htmlFor="description">Describe your art (optional)</label>
                            <textarea
                                type="text"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className={stylesShow.complete__form__input}
                                rows={4}
                                maxLength={200}
                            />
                        </div>
                        <div className={stylesShow.complete__form__group}>
                            <label htmlFor="author">Who are you? (optional)</label>
                            <input
                                type="text" value={form.author}
                                onChange={(e) => setForm({ ...form, author: e.target.value })}
                                className={stylesShow.complete__form__input}
                            />
                        </div>
                        <button className={styles.complete__btn} type="submit">Post</button>
                    </form>
                </>)}
            </div>
            : <div className={stylesFinal.final}>
                {/* Final section */}
                <div className={stylesFinal.final__content}>
                    <h1 className={stylesFinal.final__content__title}>Congratulations!</h1>
                    <img src={image} alt={"ScreenShot"} className={stylesFinal.final__image} />
                    <p className={stylesFinal.final__content__text}>Your art has been posted!</p>
                    <div className={stylesFinal.final__content__btns}>
                        <button className={stylesFinal.final__btn} onClick={() => router.push(redirectUrl)}>View</button>
                        <button className={stylesFinal.final__btn} onClick={() => router.push('/gallery')}>Explore Gallery</button>
                        <button className={stylesFinal.final__btn} onClick={resetCreateHandler}>Create Another</button>
                        <br />
                        <a
                            className={stylesFinal.final__tweet__btn}
                            href={"https://twitter.com/intent/tweet?text=" + `I just created an artwork on Public Gallery! Check it out!` + "&url=" + `https://100px-gallery.vercel.app/gallery/${imageId} ` + "&hashtags=" + "pixelart,publicgallery" + "&image=" + image}
                            target="_blank"
                            rel="noreferrer"
                            data-size="large"
                        >
                            <i class="fa-brands fa-twitter"></i>
                            Tweet
                        </a>
                    </div>
                </div>
            </div>
    );

};

export default Create