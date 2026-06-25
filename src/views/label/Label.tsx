import React from 'react'

import styles from './Label.module.scss';

interface LabelProps {
    id: string;
    label: string;
}

export const Label: React.FC<LabelProps> = ({ id, label }) => {
    return (
        <label className={styles.label} htmlFor={id}>{label}</label>
    )
}