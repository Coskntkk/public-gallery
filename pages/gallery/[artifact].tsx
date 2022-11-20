import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Components
import ArtifactPage from '../../components/ArtifactPage/ArtifactPage';
// Types
import type ArtifactType from '../../@types/artifact';
// Services
import ArtifactService from '../../services/ArtifactService';

const ArtifactPageId = () => {
    // Hooks
    const router = useRouter();
    const artifactId = router.query.artifact;
    // States
    const [artifactData, setArtifactData] = useState<ArtifactType>({ id: '', name: '', author: '', description: '', createdAt: '', image: '' });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Effects
    const getArtifact = async (id: string) => {
        ArtifactService.getArtifact(artifactId as string)
            .then((res) => {
                console.log(res);
                if (res.success) {
                    let item = res.data as ArtifactType;
                    setArtifactData(item);
                    setIsLoading(false);
                } else {
                    router.push('/404');
                }
            })
            .catch((err) => {
                console.log(err);
                router.push('/404');
            })
    };
    useEffect(() => {
        if (!artifactId) return;
        getArtifact(artifactId as string);
    }, [artifactId]);

    return (
        isLoading ? (
            <div>Loading...</div>
        ) : (
            <ArtifactPage artifact={artifactData} />
        )
    )
}

export default ArtifactPageId;