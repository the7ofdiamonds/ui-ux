import React, { ChangeEvent } from 'react'

import styles from './Input.module.scss';

interface InputProps {
    id: string;
    type: string;
    value: string;
    changeFunc: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ id, type, value, changeFunc }) => {
    return (
        <input
            type={type}
            id={id}
            name={id}
            className={styles.input}
            value={value}
            onChange={(e) => changeFunc(e)}
        />
    )
}