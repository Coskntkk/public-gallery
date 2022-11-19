import React from 'react'
// Styles
import styles from './ColorButton.module.css'
// Types
type ColorButtonProps = {
    color: string;
    onClick: () => void;
};
const ColorButton = ({ color, onClick }: ColorButtonProps) => {
    return (
        <button className={styles.colorBtn} onClick={onClick} style={{ backgroundColor: color }}></button>
    )
}

export default ColorButton