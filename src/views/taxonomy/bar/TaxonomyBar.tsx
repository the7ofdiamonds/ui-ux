import React, { useEffect, useState } from 'react';

import { Taxonomy } from '@/model/Taxonomy';

import { TaxButton } from '@/views/taxonomy/button/TaxButton';

import styles from './TaxonomyBar.module.scss';

interface TaxonomyBarProp {
  taxonomySet: Set<Taxonomy>;
  handleClick: (taxonomy: Taxonomy) => void;
}

export const TaxonomyBar: React.FC<TaxonomyBarProp> = ({ taxonomySet, handleClick }) => {
  const [taxonomies, setTaxonomies] = useState<Set<Taxonomy>>(taxonomySet);

  useEffect(() => {
    setTaxonomies(taxonomySet);
  }, [taxonomySet]);

  return (
    <>
      {taxonomies && taxonomies.size > 0 && (
        <div className={styles['project-skills-bar']}>
          {Array.from(taxonomies).map((taxonomy, index) => (
            <div className={styles.icon} key={index}>
              <TaxButton taxonomy={taxonomy} handleClick={handleClick} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}