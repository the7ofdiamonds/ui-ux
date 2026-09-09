import React, { useState, useEffect } from 'react';

import { Feature } from '../../model/Feature';
import { Features } from '../../model/Features';
import { Version } from '../../model/Version';

import { FeatureComponent } from '../feature/FeatureComponent';

import styles from './Features.module.scss';
import { CardComponent } from '../card/CardComponent';

interface FeaturesProps {
  features: Features;
  currentVersion?: Version | null;
}

export const FeaturesComponent: React.FC<FeaturesProps> = ({ features, currentVersion }) => {
  if (!features) return;

  const { list } = features;

  const featureList: Feature[] = Array.from(list ?? []).filter((feature: Feature) => {
    if (!currentVersion?.major || !feature.version?.major) return true;
    return feature.version.major <= currentVersion.major;
  });

  if (featureList.length === 0) {
    return null;
  }

  return (
    featureList &&
    (<CardComponent className={styles['product-features-card']}>
      <h3>Features</h3>

      <div className={styles['product-features']}>
        {featureList.map((feature: Feature, index: number) => (
          <FeatureComponent feature={feature} index={index} key={feature?.id ?? index} />
        ))}
      </div>
    </CardComponent>)
  );
}