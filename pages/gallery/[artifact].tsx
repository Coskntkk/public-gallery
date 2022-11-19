import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Components
import Artifact from '../../components/Artifact/Artifact';
// Services
import ArtifactService from '../../services/ArtifactService';
// Types
type ArtifactData = { id: string, name: string, author: string, description: string }

const ArtifactPage = () => {
    // Hooks
    const router = useRouter();
    const { artifact } = router.query;
    // States
    const [artifactData, setArtifactData] = useState<ArtifactData>({ id: '', name: '', author: '', description: '' });

    const getArtifact = async () => {
        ArtifactService.getArtifact(artifact)
            .then((res) => {
                console.log(res);
                if (res.success) {
                    console.log(res.data);
                    setArtifactData(res.data);
                } else {
                    router.push('/404');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (artifact !== undefined) {
            getArtifact();
        }
    }, [artifact]);

    return (
        <Artifact artifact={artifactData} />
    )
}

export default ArtifactPage;