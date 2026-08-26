import React from 'react';

import styles from './Version.module.scss'

interface VersionComponentProps {
    version?: string;
}

export const VersionComponent: React.FC<VersionComponentProps> = ({ version }) => {
    return (
        <>
            {version && (
                <span className={styles.version}>{version}</span>
            )}
        </>
    );
}