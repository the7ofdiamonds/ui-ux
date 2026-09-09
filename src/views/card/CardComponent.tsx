import React from 'react';

import styles from './Card.module.scss';

interface CardProps {
    class?: string | null;
    children?: React.ReactNode;
}

export const CardComponent: React.FC<CardProps> = ({ className, children }) => {
    return (
        <div className={`${styles.card} ${className}`} >
            {children}
        </div>
    );
}