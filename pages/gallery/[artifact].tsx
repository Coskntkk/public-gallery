import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Components
import ArtifactPage from '../../components/ArtifactPage/ArtifactPage';
import Loading from '../../components/Loading/Loading';
// Types
import type ArtifactType from '../../@types/artifact';
// Services
import ArtifactService from '../../services/ArtifactService';

const ArtifactPageId = () => {
    // Hooks
    const router = useRouter();
    const artifactId = router.query.artifact;
    // States
    const [artifactData, setArtifactData] = useState<ArtifactType>({ id: '', name: '', author: '', description: '', createdAt: '', url: '' });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Effects
    const getArtifact = async (id: string) => {
        ArtifactService.getArtifact(artifactId as string)
            .then((res) => {
                if (res.success) {
                    let item = res.data as ArtifactType;
                    setArtifactData(item);
                    setIsLoading(false);
                } else {
                    router.push('/404');
                }
            })
            .catch((error) => {
                console.log(error);
                router.push('/404');
            })
    };
    useEffect(() => {
        if (!artifactId) return;
        getArtifact(artifactId as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artifactId]);

    return (
        isLoading ? (
            <Loading />
        ) : (
            <ArtifactPage artifact={artifactData} />
        )
    )
}

export default ArtifactPageId;