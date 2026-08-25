import React, { useEffect, useState } from 'react';

import styles from './Copyright.module.scss';

interface CopyrightComponentProps {
    startingYear?: number | null;
    name?: string | null;
}

export const CopyrightComponent: React.FC<CopyrightComponentProps> = ({ startingYear, name }) => {
    const year = new Date().getFullYear();

    const [copyright, setCopyright] = useState<string | null>(null)

    useEffect(() => {
        const copyrightSymbol = "© Copyright";
        if (!name) {
            setCopyright(null)
        } else if (startingYear && year && startingYear < year && name) {
            setCopyright(`${copyrightSymbol} ${startingYear} - ${year} ${name}`)
        } else if (name) {
            setCopyright(`${copyrightSymbol} ${year} ${name}`)
        }
    }, [])

    return (copyright &&
        <span className={styles.legal}>{copyright}. All Rights Reserved.</span>
    );
}