import React, { useState, useEffect } from 'react';

import { Price } from '@the7ofdiamonds/ui-ux';

import styles from './Price.module.scss';

interface PriceComponentProps {
    price: Price | null;
    index?: number | null;
}

export const PriceComponent: React.FC<PriceComponentProps> = ({ price, index }) => {
    const [id, setID] = useState<string | number | null>(null);
    const [display, setDisplay] = useState<string | null>(null);

    useEffect(() => {
        if (price?.id) {
            setID(price?.id)
        } else if (!price?.id) {
            setID(index)
        }
    }, [price?.id])

    useEffect(() => {
        if (price && typeof price.getDisplay()  === 'string') {
            setDisplay(price.getDisplay())
        }
    }, [price?.amount])

    return (display &&
        (<div className={`${styles['price']}`} id={id}>
            <h2 className={`${styles['price']}`}>{display}</h2>
        </div>)
    );
}