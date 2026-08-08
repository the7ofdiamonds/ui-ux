import React, { ChangeEvent } from 'react';

import { EditString } from '../input/EditString';
import { Label } from '../../label/Label';

import styles from '../Edit.module.scss';

interface FormLabelInputProps {
    id: string | null;
    label: string;
    text: string | null;
    description: string | null;
    name: string | null;
    change: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FormLabelInput: React.FC<FormLabelInputProps> = ({ id, label, text, description, name, change }) => {
    return (
        <div className={styles['form-item-flex']}>
            <Label id={id} label={label} />
            <EditString id={id} text={text} description={description} name={name} change={change} />
        </div>
    )
}