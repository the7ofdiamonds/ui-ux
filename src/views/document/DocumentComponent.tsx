import React, { useEffect, useState } from 'react';

import { MessageType, StatusBar, StatusBarVisibility } from '@/views/status_bar/StatusBar';

import { Main } from '@/views/main/Main';

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
                id="pdf_viewer"
                src={`${url}#view=fit`}
                title="PDF Viewer"
                allowFullScreen
                style={{
                    border: 0,
                    margin: 0,
                    padding: 0,
                    display: "block",
                    width: '100%',
                    height: '100%'
                }}
            />}
            {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Main>);
};