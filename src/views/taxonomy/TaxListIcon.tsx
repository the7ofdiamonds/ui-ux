import React, { useEffect, useState } from 'react';

import { Taxonomy } from '@/model/Taxonomy';

import { TaxonomyBar } from './bar/TaxonomyBar';

import styles from './TaxListIcon.module.scss';

interface TaxListIconProps {
  taxonomiesTitle: string;
  taxonomiesSet: Set<Taxonomy>;
  handleClick: (taxonomy: Taxonomy) => void;
}

export const TaxListIcon: React.FC<TaxListIconProps> = ({ taxonomiesTitle, taxonomiesSet, handleClick }) => {
  const [title, setTitle] = useState<string | null>(null);
  const [projectSkills, setProjectSkills] = useState<Set<Taxonomy>>(taxonomiesSet);

  useEffect(() => {
    setTitle(taxonomiesTitle)
  }, [taxonomiesTitle, setTitle]);

  useEffect(() => {
    setProjectSkills(taxonomiesSet);
  }, [taxonomiesSet]);

  return (
    projectSkills.size > 0 && (
      <div className={styles['tax-list']}>
        {title && <h5 className={styles.title}>{title}</h5>}

        <div className={styles['tax-row']}>
          <TaxonomyBar taxonomySet={projectSkills} handleClick={handleClick} />
        </div>
      </div>
    )
  );
}