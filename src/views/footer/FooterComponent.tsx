import React from 'react';

import styles from './Footer.module.scss';

interface FooterComponentProps {
  children?: React.ReactNode;
  name: string;
  version?: string;
}

export const FooterComponent: React.FC<FooterComponentProps> = ({ children, name, version }) => {
  const year = new Date().getFullYear();

  return (
    <footer>
      {children}
      <span className={styles.legal}>© Copyright 2010 - {year} {name}. All Rights Reserved.</span>
      {version && (
        <span className={styles.legal}>{version}</span>
      )}
    </footer>
  );
}