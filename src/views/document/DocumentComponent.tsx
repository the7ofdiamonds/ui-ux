import React, { useEffect, useState } from 'react';

import type { MessageType, StatusBarVisibility } from '../../views/status_bar/StatusBar';
import { StatusBar } from '../../views/status_bar/StatusBar';

import { Main } from '../../views/main/Main';

import styles from './Document.module.scss';

interface DocumentComponentProps {
    documentURL: string;
}

export const DocumentComponent: React.FC<DocumentComponentProps> = ({ documentURL }) => {
    const [url, setURL] = useState<string | null>(null);
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');

    useEffect(() => {
        if (
            documentURL && typeof documentURL === 'string' && documentURL.trim() !== ''
        ) {
            try {
                new URL(documentURL);
                setURL(documentURL);
            } catch (error) {
                const err = error as Error;
                setShowStatusBar('show');
                setMessage(err.message)
                setMessageType('error');
            }
        }
    }, [documentURL]);

    return (
        <Main>
            {url && <iframe
                id="PDF Viewer"
                className={styles['pdf-viewer']}
                src={`${url}#view=fit`}
                title="PDF Viewer"
                allowFullScreen
            />}
            {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Main>);
};