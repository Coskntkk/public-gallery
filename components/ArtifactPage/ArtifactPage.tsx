import React from 'react';
// Stles
import styles from './ArtifactPage.module.css';
// Types
import type ArtifactType from '../../@types/artifact'
// Components
import Artifact from '../Artifact/Artifact'

const ArtifactPage = ({ artifact }: { artifact: ArtifactType }) => {
    return (
        <div className={styles.artifactPage}>
            <Artifact artifact={artifact} />
        </div>
    )
}

export default ArtifactPage