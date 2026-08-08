import React, { useEffect, useState, ChangeEvent } from 'react';

import styles from './EditString.module.scss';

interface EditStringProps {
    id: string | null;
    text: string | null;
    description: string | null;
    name: string | null;
    change: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const EditString: React.FC<EditStringProps> = ({ id, text, description, name, change }) => {
    return (
        <input className={styles.input} type="text" id={id} value={text ?? ''} placeholder={description ?? ''} name={name} onChange={change} />
    )
}