import React from 'react';

import styles from './Footer.module.scss';

interface FooterComponentProps {
  children?: React.ReactNode;
}

export const FooterComponent: React.FC<FooterComponentProps> = ({ children }) => {
  return (
    <footer className={styles.footer}>
      {children}
    </footer>
  );
}