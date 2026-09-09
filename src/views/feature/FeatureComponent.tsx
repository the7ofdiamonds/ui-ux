import React from 'react';

import { Feature } from '../../model/Feature';

import styles from './Feature.module.scss';

interface FeatureProps {
  feature: Feature | null;
  index?: number | null;
}

export const FeatureComponent: React.FC<FeatureProps> = ({ feature, index }) => {
  if (!feature) return;

  const { id, description } = feature;

  return (
    description && (<p className={styles['product-feature']} id={id ?? index}>
      <span className={styles['product-feature-point']}>-</span> {description}
    </p>)
  );
}