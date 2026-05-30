import React, { useEffect, useState } from 'react';

import styles from './Modal.module.scss';

interface ModalProps {
  show: 'show' | 'hide';
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ show, children }) => {
  const [showModal, setShowModal] = useState<'show' | 'hide'>('hide');

  useEffect(() => {
    setShowModal(show)
  }, [show])

  return (
    <span className={`${styles['modal-overlay']} ${showModal === 'show' ? styles['show'] : styles['hide']}`}>
      {children}
    </span>
  );
}