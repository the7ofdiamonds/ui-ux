import React from 'react'

import styles from './Button.module.scss';

interface ButtonProps {
    title: string | null;
    description?: string;
    action: () => void;
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ action, description, children, title }) => {
    return (
        <button className={styles.button} onClick={action} title={description}>
            {children}
            <h3 className={`${styles.title} ${styles.h3}`}>{title}</h3>
        </button>
    )
}