import React, { useState } from 'react';

import { Modal } from '@/views/modal/Modal';

import styles from './StatusBar.module.scss';

interface StatusBarProps {
  show: 'show' | 'hide';
  messageType: string;
  message: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ show, messageType, message }) => {
  const [showModal, setShowModal] = useState<'show' | 'hide'>(show);

  const minimize = () => {
    if (showModal == 'show') {
      setShowModal('hide');
    }

    if (showModal == 'hide') {
      setShowModal('show');
    }
  };

  return (
    message && (
      <Modal show={showModal}>
        <div className={styles.status}>
          <div className={styles.close}>
            <button onClick={minimize}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </div>

          <div className={`${styles['status-bar']} ${styles.card} ${messageType}`} id="status_bar">
            <span>{message}</span>
          </div>
        </div>
      </Modal>
    )
  );
}