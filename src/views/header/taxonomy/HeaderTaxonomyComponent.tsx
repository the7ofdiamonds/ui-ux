import React from 'react'

import { Taxonomy } from '../../../model/Taxonomy'

import { HeaderImageComponent } from '../image/HeaderImageComponent';

import styles from './HeaderTaxonomy.module.scss';

interface HeaderTaxonomyComponentProps {
    tax: Taxonomy
}

export const HeaderTaxonomyComponent: React.FC<HeaderTaxonomyComponentProps> = ({ tax }) => {
    return (
        <HeaderImageComponent className={styles["header-tax"]} title={tax.title} image={tax.image} />
    )
}