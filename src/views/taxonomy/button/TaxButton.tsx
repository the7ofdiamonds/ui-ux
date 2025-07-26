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
            {taxonomy.image && (taxonomy.image.className || taxonomy.image.url)
                ? <button
                    className={styles['taxonomies-button']}
                    onClick={() => handleClick(taxonomy)}>
                    <ImageComponent image={taxonomy.image} />
                </button> : <button
                    className={styles.tag}
                    onClick={() => handleClick(taxonomy)}>
                    <h6>{taxonomy.title}</h6>
                </button>}
        </>
    )
}