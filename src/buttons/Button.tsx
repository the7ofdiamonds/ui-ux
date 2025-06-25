import React from 'react'

import styles from './Button.module.scss';

interface ButtonProps {
    title: string;
    action: () => void
}

export const Button: React.FC<ButtonProps> = ({ action, title }) => {
    return (
        <button className={styles.button} onClick={action}>
            <h3 className={`${styles.title} ${styles.h3}`}>{title}</h3>
        </button>
    )
}