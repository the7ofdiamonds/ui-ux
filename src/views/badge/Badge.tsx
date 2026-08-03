import React from 'react';

import styles from './Badge.module.scss';

interface BadgeProps {
    amount: number | null;
    children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ amount, children }) => {
    return (
        <>
            {amount && amount > 0 && children &&
                <div className={styles.badge}>
                    <div className={styles['badge-number']}>
                        <h5>{amount}</h5>
                    </div>

                    {children}
                </div>}
        </>
    );
};