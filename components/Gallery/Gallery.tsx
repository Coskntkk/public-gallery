import React, { useEffect, useState } from 'react';
// Styles
import styles from './Gallery.module.css';
// Components
import Artifact from '../Artifact/Artifact';
import Link from 'next/link';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import Loading from '../Loading/Loading';
// Types
import type ArtifactType from '../../@types/artifact';
// Services
import ArtifactService from '../../services/ArtifactService';

const Gallery = () => {
    // States
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [numberOfArtifacts, setNumberOfArtifacts] = useState<number>(0);
    const [keyword, setKeyword] = useState<string>('');
    const [refresh, setRefresh] = useState<boolean>(false);
    const [artifacts, setArtifacts] = useState<ArtifactType[]>([]);
    // Effects
    const getArtifacts = async () => {
        setLoading(true);
        ArtifactService.getAllArtifacts({ page: currentPage, keyword })
            .then((res) => {
                const items = res.data as ArtifactType[];
                let totalItems = res.total as number;
                setNumberOfArtifacts(totalItems);
                setArtifacts(items);
                setTotalPages(Math.ceil(totalItems / 8));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
                setKeyword('');
            });
    }
    useEffect(() => {
        getArtifacts();
    }, [currentPage, refresh]);

    return (
        loading ?
            <Loading /> :
            <div className={styles.gallery}>
                <h1>Gallery</h1>
                <div className={styles.gallery__container}>
                    <div className={styles.gallery__info}>
                        <Search keyword={keyword} setKeyword={setKeyword} refresh={refresh} setRefresh={setRefresh} />
                        <p className={styles.gallery__container__count}><span className={styles.orange}>{numberOfArtifacts}</span> item/s found</p>
                    </div>
                    {/* if artifacts is empty */}
                    {artifacts.length === 0 ?
                        <div className={styles.gallery__empty}>
                            <h2>No artifacts found</h2>
                            <Link href="/create" className={styles.gallery__empty__link}>
                                Create one
                            </Link>
                        </div> :
                        artifacts.map((artifact) => (
                            <div className={styles.gallery__artifact} key={artifact.id}>
                                <div className={styles.gallery__artifact__container}>
                                    <Link href={`/gallery/${artifact.id}`}>
                                        <Artifact artifact={artifact} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </div>
            </div>
    )
}

export default Gallery