import React, { ChangeEvent } from 'react'

import { Label } from '@/label/Label';
import { Input } from './Input';

import styles from './Input.module.scss';

interface InputLabelProps {
    id: string;
    label: string;
    type: string;
    value: string;
    changeFunc: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputLabel: React.FC<InputLabelProps> = ({ id, label, type, value, changeFunc }) => {
    return (
        <span className={styles.option}>
            <Label id={id} label={label}/>
            <Input
                type={type}
                id={id}
                value={value}
                changeFunc={changeFunc}
            />
        </span>
    )
}