import React from 'react';
// Styles
import styles from './Artifact.module.css';
// Types
import type ArtifactType from '../../@types/artifact';
type ArtifactProps = {
    artifact: ArtifactType
}

const Artifact = ({ artifact }: ArtifactProps) => {
    return (
        <div className={styles.artifact}>
            <img src={`/images/${artifact.id}.png`} alt="[artifact]" width={320} height={320} className={styles.artifact__image} />
            <div className={styles.artifact__info}>
                <h1 className={styles.artifact__name}>{artifact.name}</h1>
                <p className={styles.artifact__description}>
                    {artifact.description === "No description" ? "No description." : ("“ "+artifact.description + " ”")}
                </p>
                <p className={styles.artifact__author}><span className={styles.info__span}>Author: </span>{artifact.author}</p>
                <span className={styles.artifact__date}><span className={styles.info__span}>Created at: </span>{artifact.createdAt?.split("T")[0].split("-").reverse().join("/")}</span>
            </div>
        </div>
    )
}

export default Artifact;