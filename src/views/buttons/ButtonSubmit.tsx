import React from 'react'

import styles from './Button.module.scss';

interface ButtonSubmitProps {
    title: string;
    submit: (data: object) => void
}

export const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ submit, title }) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        submit({ clicked: true });
    };

    return (
        <button className={styles.button} onClick={handleClick}>
            <h3 className={`${styles.title} ${styles.h3}`}>{title}</h3>
        </button>
    )
}