import React from 'react';

import styles from './Loading.module.scss';

interface LoadingComponentProps {
  page: string | null;
  message: string | null;
}

export const LoadingComponent: React.FC<LoadingComponentProps> = ({ page, message }) => {
  const loadingMessage = page ? `Now Loading ${page} Page ...` : message ? `${message}` : "Now Loading {page} ...";

  return (
    <main className={styles.loading}>
      <h1 className={styles.h1}>{`${loadingMessage}`}</h1>
    </main>
  );
}