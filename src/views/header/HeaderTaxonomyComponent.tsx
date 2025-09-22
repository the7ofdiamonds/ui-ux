import React from 'react'

import { Taxonomy } from '@/model/Taxonomy'

import { ImageComponent } from '../image/ImageComponent';

import styles from './Header.module.scss';

interface HeaderTaxonomyComponentProps {
    skill: Taxonomy
}

export const HeaderTaxonomyComponent: React.FC<HeaderTaxonomyComponentProps> = ({ skill }) => {
    return (
        <h1 className={`title ${styles["header-tax"]}`}>
            {skill.image && <ImageComponent image={skill.image} />}
            {skill.title}
        </h1>
    )
}