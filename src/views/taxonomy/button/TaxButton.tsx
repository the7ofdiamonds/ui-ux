import React from 'react'

import { Taxonomy } from '@/model/Taxonomy';

import { ImageComponent } from '@/views/image/ImageComponent';

import styles from './TaxonomyButton.module.scss';

interface TaxButtonProps {
    taxonomy: Taxonomy;
    handleClick: (taxonomy: Taxonomy) => void;
}

export const TaxButton: React.FC<TaxButtonProps> = ({ taxonomy, handleClick }) => {
    return (
        <>
            <button className={styles.button} onClick={() => handleClick(taxonomy)} title={taxonomy.description ?? ''}>
                {taxonomy.image && <ImageComponent image={taxonomy.image} />}
                {taxonomy.title && <h3 className='title'>{taxonomy.title}</h3>}
            </button>
        </>
    )
}