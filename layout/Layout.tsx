import React from 'react';
// Styles
import styles from './Layout.module.css';
// Components
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
// Types
import type { ReactNode } from 'react';
type LayoutProps = {
    children: ReactNode
};

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className={styles.main}>
                {children}
            </div>
            <Footer />
        </>
    )

}
export default MainLayout;