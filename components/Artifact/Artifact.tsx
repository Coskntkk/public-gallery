import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
// Services
import ArtifactService from '../../services/ArtifactService';
// Styles
import styles from './Artifact.module.css';
// Types
type ArtifactProps = {
    artifact: { id: string, name: string, author: string, description: string, createdAt: string }
}

const Artifact = ({ artifact }: ArtifactProps) => {

    return (
        <div className={styles.artifact}>
            <Image src={`/images/${artifact.id}.png`} alt="[artifact]" width={320} height={320} />
            <div className={styles.artifact__info}>
                <h1 className={styles.artifact__name}>{artifact.name}</h1>
                <p className={styles.artifact__description}>
                    {artifact.description === "No description" ? "No description." : ("“ "+artifact.description + " ”")}
                </p>
                <p className={styles.artifact__author}>Author: {artifact.author}</p>
                <span className={styles.artifact__date}> Created: {artifact.createdAt?.split("T")[0].split("-").reverse().join("/")}</span>
            </div>
        </div>
    )
}

export default Artifact;