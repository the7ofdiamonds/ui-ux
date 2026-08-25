import React, { useEffect, useState } from 'react';

import styles from './Modal.module.scss';

import { ButtonExit } from '../buttons/exit/ButtonExit';
import type { MessageType, Visibility } from '../../model/Display';

interface ModalProps {
  show: Visibility | null;
  messageType: MessageType | null;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ show, messageType, children }) => {
  const [showModal, setShowModal] = useState<Visibility | null>(null);

  useEffect(() => {
    if (show) {
      setShowModal(show)
    }
  }, [show])

  const minimize = () => {
    if (showModal == 'show') {
      setShowModal('hide');
    }

    if (showModal == 'hide') {
      setShowModal('show');
    }
  };

  return (
    <span className={`${styles['modal-overlay']} ${showModal === 'show' ? styles['show'] : styles['hide']}`}>
      <div className={`${showModal === 'show' ? styles.show : styles.hide} ${styles.status}`}>
        <div className={styles.close}>
          <ButtonExit messageType={messageType} onClick={minimize} />
        </div>

        {children}

      </div>
    </span>
  );
}