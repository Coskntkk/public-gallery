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
        '#ffffff',
        '#ff0000',
        '#00ff00',
        '#0000ff',
        '#ffff00',
        '#00ffff',
        '#ff00ff',
        '#ff8000',
        '#8000ff',
        '#0080ff',
        '#ff0080',
    ]);
    const handleColorClick = (color: string) => {
        setCurrentColor(color);
    }
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
                    <input type="color" onChange={(e) => handleColorClick(e.target.value)} className={styles.palette__input} />
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