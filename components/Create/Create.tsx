import React, { useState, createRef, useEffect } from 'react'
import html2canvas from 'html2canvas';
// Styles
import styles from './Create.module.css';
// Components
import Pixel from '../Pixel/Pixel';
import Palette from '../Palette/Palette';
import Preview from '../Preview/Preview';
import Final from '../Final/Final';
import Loading from '../Loading/Loading';
// Services
import ArtifactService from '../../services/ArtifactService';

const Create = () => {
    // Hooks
    const ref: any = createRef();
    // States
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(true);
    const [image, setImage] = useState<string | null>(null);
    const [imageId, setImageId] = useState<string | null>(null);
    const [currentColor, setCurrentColor] = useState<string>('#000000');
    const [redirectUrl, setRedirectUrl] = useState<string>('');
    const [form, setForm] = useState<{ name: string; description: string; author: string; }>({ name: '', description: '', author: '' });
    const [pixels, setPixels] = useState<string[]>(new Array(256).fill('#ffffff'));
    // Handlers
    const handleComplete = () => {
        setLoading(true);
        setIsCreating(false);
        for (let item of ref.current.children as any) {
            item.style.border = "none"
        }
        html2canvas(ref.current as HTMLElement, {}).then((canvas) => {
            setImage(canvas.toDataURL());
            setLoading(false);
        });
    };
    const handleFinish = (e: React.FormEvent<HTMLFormElement>) => {
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
                let itemId = res.data as any;
                let url = "/gallery/" + itemId;
                setRedirectUrl(url);
                setImageId(itemId!);
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
        setPixels(new Array(256).fill('#ffffff'));
        setForm({ name: '', description: '', author: '' });
    };

    return (
        loading ? <Loading /> :
            !isModalOpen
                ?
                (isCreating ? (
                    <div className={styles.create}>
                        <div className={styles.canvas} ref={ref as any}>
                            {pixels.map((pixel, index) => (
                                <Pixel
                                    key={index}
                                    currentColor={currentColor}
                                    pixel={pixel}
                                    pixels={pixels}
                                    setPixels={setPixels}
                                    index={index}
                                    isCreating={isCreating}
                                />
                            ))}
                        </div>
                        <Palette
                            setCurrentColor={setCurrentColor}
                            setPixels={setPixels}
                        />
                        <button
                            className={styles.complete__btn}
                            onClick={handleComplete}
                        >
                            Complete
                        </button>
                    </div>
                ) : <Preview
                    image={image!}
                    form={form}
                    setForm={setForm}
                    handleFinish={handleFinish}
                />)
                : <Final
                    image={image!}
                    imageId={imageId!}
                    redirectUrl={redirectUrl}
                    resetCreateHandler={resetCreateHandler}
                />
    );

};

export default Create