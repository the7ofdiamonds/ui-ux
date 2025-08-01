import React from 'react'

import { Taxonomy } from '@/model/Taxonomy'

import { IconComponent } from '@/views/icon/IconComponent'

import styles from './Header.module.scss';

interface HeaderTaxonomyComponentProps {
    skill: Taxonomy
}

export const HeaderTaxonomyComponent: React.FC<HeaderTaxonomyComponentProps> = ({ skill }) => {
    return (
        <>
            <h1 className={styles['page-title']}>
                {skill.image && <IconComponent icon={skill.image} />}
                {skill.title}
            </h1>
        </>
    )
}