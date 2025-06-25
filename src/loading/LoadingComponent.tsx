import React from 'react';

import styles from './Loading.module.scss';

interface LoadingComponentProps {
  page: string;
}

export const LoadingComponent: React.FC<LoadingComponentProps> = ({ page }) => {
  return (
    <main className={styles.loading}>
      <h1 className={styles.h1}>Now Loading {page} ...</h1>
    </main>
  );
}