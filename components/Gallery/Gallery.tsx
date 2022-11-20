import React, { useEffect, useState } from 'react';
// Styles
import styles from './Gallery.module.css';
// Components
import Artifact from '../Artifact/Artifact';
import Link from 'next/link';
// Types
import type ArtifactType from '../../@types/artifact';
// Services
import ArtifactService from '../../services/ArtifactService';

const Gallery = () => {
    // States
    const [artifacts, setArtifacts] = useState<ArtifactType[]>([]);
    // Effects
    const getArtifacts = async () => {
        ArtifactService.getAllArtifacts()
            .then((res) => {
                const items = res.data as ArtifactType[];
                setArtifacts(items);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getArtifacts();
    }, []);

    return (
        <div className={styles.gallery}>
            <h1>Gallery</h1>
            <div className={styles.gallery__container}>
                {artifacts.map((artifact) => (
                    <div className={styles.gallery__artifact} key={artifact.id}>
                        <div className={styles.gallery__artifact__container}>
                            <Link href={`/gallery/${artifact.id}`}>
                                <Artifact artifact={artifact} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery