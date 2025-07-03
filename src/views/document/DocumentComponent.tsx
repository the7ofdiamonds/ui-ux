import React, { useEffect, useState } from 'react';

import { StatusBar } from '@/views/status_bar/StatusBar';

import { Main } from '@/views/main/Main';

interface DocumentComponentProps {
    documentURL: string;
}

export const DocumentComponent: React.FC<DocumentComponentProps> = ({ documentURL }) => {
    const [url, setURL] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('');

    useEffect(() => {
        if (
            documentURL && typeof documentURL === 'string' && documentURL.trim() !== ''
        ) {
            try {
                new URL(documentURL);
                setURL(documentURL);
            } catch (error) {
                const err = error as Error;
                setMessage(err.message)
                setMessageType('error');
            }
        }
    }, [documentURL]);

    return (
        <Main>
            {url ? (
                <iframe
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
                />
            ) : (
                <StatusBar show={'hide'} messageType={messageType} message={message} />
            )}
        </Main>);
};