import React from 'react';

import styles from './ButtonExit.module.scss';

import type { MessageType } from '../../../model/Display';

interface ButtonExitProps {
    onClick: () => void;
    messageType: MessageType;
}

export const ButtonExit: React.FC<ButtonExitProps> = ({ onClick, messageType }) => {
    return (
        <button className={`${styles['exit-button']} ${styles[messageType]}`} onClick={onClick}>
            <i className="fa-solid fa-circle-xmark"></i>
        </button>
    );
}