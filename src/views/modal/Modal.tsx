import React from 'react';

import styles from './Modal.module.scss';

interface ModalProps {
  show: 'show' | 'hide';
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ show, children }) => {
  return (
    <span className={`${styles.overlay} ${show}`}>
      {children}
    </span>
  );
}