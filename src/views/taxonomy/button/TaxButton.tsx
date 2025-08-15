import React from 'react'

import { Taxonomy } from '@/model/Taxonomy';

import { ImageComponent } from '@/views/image/ImageComponent';

import styles from './TaxonomyButton.module.scss';
import { Button } from '@/views/buttons/Button';
import { ButtonImage } from '@/views/buttons/ButtonImage';

interface TaxButtonProps {
    taxonomy: Taxonomy;
    handleClick: (taxonomy: Taxonomy) => void;
}

export const TaxButton: React.FC<TaxButtonProps> = ({ taxonomy, handleClick }) => {
    return (
        <>
            {taxonomy.image && (taxonomy.image.className || taxonomy.image.url)
                ? <ButtonImage action={() => handleClick(taxonomy)} image={taxonomy.image} name={null} url={null} />
                : <Button title={taxonomy.title} action={() => handleClick(taxonomy)} />
            }
        </>
    )
}