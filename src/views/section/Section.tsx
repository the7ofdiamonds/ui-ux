import React from 'react'

interface SectionProps {
    children?: React.ReactNode;
}

import styles from './Section.module.scss';

export const Section: React.FC<SectionProps> = ({ children }) => {
    return (
        <section className={styles.section}>
            {children}
        </section>
    )
}