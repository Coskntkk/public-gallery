import React, { useEffect, useState } from 'react'
// Styles
import styles from './Gallery.module.css';
// Services
import ArtifactService from '../../services/ArtifactService';
// Components
import Artifact from '../Artifact/Artifact';
import Link from 'next/link';
// Types
type ArtifactData = { id: string, name: string, author: string, description: string, createdAt: string }

const Gallery = () => {
    const [artifacts, setArtifacts] = useState<ArtifactData[]>([]);
    const getArtifacts = async () => {
        ArtifactService.getArtifacts()
            .then((res) => {
                setArtifacts(res.data);
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
                        <Link href={`/gallery/${artifact.id}`}>
                            <Artifact artifact={artifact} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery