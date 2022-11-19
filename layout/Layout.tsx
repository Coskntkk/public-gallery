import React from 'react';
// Types
import type { ReactNode } from 'react';
// Components
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
// Styles
import styles from './Layout.module.css';

type LayoutProps = {
    children: ReactNode
};

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </>
    )

}
export default MainLayout;