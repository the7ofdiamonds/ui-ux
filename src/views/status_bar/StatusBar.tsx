import React from 'react';

import styles from './StatusBar.module.scss';

import type { MessageType } from '../../model/Display';

interface StatusBarProps {
  messageType: MessageType | null;
  message: string | null;
}

export const StatusBar: React.FC<StatusBarProps> = ({ messageType, message }) => {
  return (
    message && messageType && (
      <div className={`${styles['status-bar']} ${styles.card} ${styles[messageType]}`} id="status_bar">
        <h4>{message}</h4>
      </div>)
  );
}