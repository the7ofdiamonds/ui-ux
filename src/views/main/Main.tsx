import React from 'react'

import styles from './Main.module.scss';

interface MainProps {
    children?: React.ReactNode;
    fullHeight?: boolean;
}

export const Main: React.FC<MainProps> = ({ children, fullHeight }) => {
    return (
        <main className={`${styles.main} ${fullHeight ? styles['full-height'] : ''}`}>
            {children}
        </main>
    )
}