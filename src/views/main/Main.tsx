import React from 'react'

import styles from './Main.module.scss';

interface MainProps {
    fullHeight?: boolean;
    id?: string;
    children?: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ fullHeight, id, children }) => {
    return (
        <main className={`${styles.main} ${fullHeight ? styles['full-height'] : ''}`} id={id}>
            {children}
        </main>
    )
}