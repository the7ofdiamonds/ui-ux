import React from 'react'

import styles from './Button.module.scss';

interface ButtonSubmitProps {
    title: string;
    submit: (data: object) => void
}

export const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ submit, title }) => {
    return (
        <button className={styles.button} onClick={() => submit({ clicked: true })}>
            <h3 className={`${styles.title} ${styles.h3}`}>{title}</h3>
        </button>
    )
}