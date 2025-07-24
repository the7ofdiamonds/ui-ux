import React, { useEffect, useState } from 'react';

import { Taxonomy } from '@/model/Taxonomy';

import { ImageComponent } from '@/views/image/ImageComponent';

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
              {taxonomy.image && (taxonomy.image.className || taxonomy.image.url)
                ? <button
                  key={index}
                  className={styles['taxonomies-button']}
                  onClick={() => handleClick(taxonomy)}>
                  <ImageComponent image={taxonomy.image} />
                </button> : <button
                  key={index}
                  className={styles.tag}
                  onClick={() => handleClick(taxonomy)}>
                  <h6>{taxonomy.title}</h6>
                </button>}
            </div>
          ))}
        </div>
      )}
    </>
  );
}