import React, { useState } from 'react';
// Styles
import styles from './Palette.module.css';
// Components
import ColorButton from '../ColorButton/ColorButton';
// Types
type PaletteProps = {
    setCurrentColor: React.Dispatch<React.SetStateAction<string>>,
    setPixels: React.Dispatch<React.SetStateAction<string[]>>,
};

const Palette = ({ setCurrentColor, setPixels }: PaletteProps) => {
    // States
    const [colors, setColors] = useState<string[]>([
        '#000000',
        '#9d9d9d',
        '#ffffff',
        '#be2633',
        '#e06f8b',
        '#493c2b',
        '#a46422',
        '#eb8931',
        '#f7e26b',
        '#2f484e',
        '#44891a',
        '#a3ce27',
        '#1b2632',
        '#005784',
        '#31a2f2',
        '#b2dcef',
    ]);
    const [customColor, setCustomColor] = useState<string>('#ffffff');
    // Handlers
    const handleColorClick = (color: string) => {
        setCurrentColor(color);
    }
    const handleAddCustomColor = (color: string) => {
        setCurrentColor(color);
        setCustomColor(color);
    };

    return (
        <div className={styles.palette}>
            <div className={styles.colors}>
                {colors.map((color, index) => (
                    <ColorButton key={index} color={color} onClick={() => handleColorClick(color)} />
                ))}
            </div>
            <div className={styles.palette__tools}>
                <div className={styles.palette__custom}>
                    Custom Color
                    <div className={styles.palette__custom__color}>
                        <input type="color" onChange={(e) => handleAddCustomColor(e.target.value)} className={styles.palette__input} />
                        <ColorButton color={customColor} onClick={() => handleColorClick(customColor)} />
                    </div>
                </div>
                <div className={styles.palette__custom}>
                    Tools
                    <div className={styles.palette__tools__btns}>
                        <button className={styles.palette__btn} onClick={() => handleColorClick("#FFFFFF")}><i className="fa-solid fa-eraser fa-2x"></i></button>
                        <button className={styles.palette__btn} onClick={() => setPixels(new Array(100).fill('#ffffff'))}><i className="fa-regular fa-file fa-2x"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Palette