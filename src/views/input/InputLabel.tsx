import React, { ChangeEvent } from 'react'

import { Label } from '@/views/label/Label';
import { Input } from './Input';

import styles from './Input.module.scss';

interface InputLabelProps {
    id: string;
    className?: string;
    label: string;
    type: string;
    value: string;
    changeFunc: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputLabel: React.FC<InputLabelProps> = ({ id, className, label, type, value, changeFunc }) => {
    return (
        <span className={`${styles.option} ${className}`}>
            <Label id={id} label={label} />
            <Input
                type={type}
                id={id}
                className={className}
                value={value}
                changeFunc={changeFunc}
            />
        </span>
    )
}