import React from 'react';
// Styles
import styles from './Pixel.module.css';
// Types
type PixelProps = {
    currentColor: string,
    pixel: string,
    pixels: string[],
    setPixels: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    isCreating: boolean
};

const Pixel = ({ currentColor, pixel, pixels, setPixels, index, isCreating }: PixelProps) => {
    // Handlers
    const handlePixelClick = () => {
        if (isCreating) {
            const newPixels = [...pixels];
            newPixels[index] = currentColor;
            setPixels(newPixels);
        }
    }
    const checkIfMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.buttons === 1) {
            handlePixelClick();
        }
    }

    return (
        <div
            className={styles.pixel}
            style={{ backgroundColor: pixel }}
            onMouseDown={handlePixelClick}
            onMouseEnter={checkIfMouseDown}
        />
    )
}

export default Pixel