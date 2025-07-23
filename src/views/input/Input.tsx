import React, { ChangeEvent } from 'react'

import styles from './Input.module.scss';

interface InputProps {
    id: string;
    className?: string;
    type: string;
    value: string;
    changeFunc: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ id, className, type, value, changeFunc }) => {
    return (
        <input
            type={type}
            id={id}
            name={id}
            className={`${styles.input} ${className}`}
            value={value}
            onChange={(e) => changeFunc(e)}
        />
    )
}