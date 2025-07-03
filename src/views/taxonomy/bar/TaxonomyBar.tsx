import React, { useEffect, useState } from 'react';

import { IconComponent } from '@the7ofdiamonds/ui-ux';

import { Taxonomy } from '@/model/Taxonomy';

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

  // const handleClick = (skill: Taxonomy) => {
  //   handleSkills();
  //   window.location.href = `/projects/${skill.path}/${skill.id}`;
  // };

  // const handleSkills = () => {
  //   const skillsElement = document.getElementById('top');

  //   if (skillsElement) {
  //     skillsElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <>
      {taxonomies && taxonomies.size > 0 && (
        <div className={styles['project-skills-bar']}>
          {Array.from(taxonomies).map((taxonomy, index) => (
            <div className={styles.icon} key={index}>
              {taxonomy.image &&
                (taxonomy.image.className !== '' || taxonomy.image.url !== '')
                ? <button
                  key={index}
                  className={styles['taxonomys-button']}
                  onClick={() => handleClick(taxonomy)}>
                  <IconComponent imageClass={taxonomy.image} />
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