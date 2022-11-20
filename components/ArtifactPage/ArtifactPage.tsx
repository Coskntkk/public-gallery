import React from 'react';
// Stles
import styles from './ArtifactPage.module.css';
// Components
import Artifact from '../Artifact/Artifact';
// Types
import type ArtifactType from '../../@types/artifact';

const ArtifactPage = ({ artifact }: { artifact: ArtifactType }) => {
    return (
        <div className={styles.artifactPage}>
            <Artifact artifact={artifact} />
        </div>
    )
}

export default ArtifactPage