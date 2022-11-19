import React, { useContext} from 'react';
// Styles
import stles from './Navbar.module.css';
// Next
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
        <div className={stles.navbar}>
            <div className={stles.navbar__logo}>
                <Image src="/favicon.ico" alt="logo" width={40} height={40} />
                Public Gallery
            </div>
            <div className={stles.navbar__links}>
                <Link href="/">Home</Link>
                <Link href="/create">Create</Link>
                <Link href="/gallery">Gallery</Link>
            </div>
        </div>
    )
}

export default Navbar