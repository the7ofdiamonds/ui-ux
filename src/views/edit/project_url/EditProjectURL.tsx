import React, { useState, ChangeEvent } from 'react';

import { ProjectURLs, ProjectURL } from '@the7ofdiamonds/ui-ux';

import { FormLabelInput } from '../form/FormLabelInput';
import { StatusBar } from '../../status_bar/StatusBar';

import styles from './ProjectURL.module.scss';

interface EditProjectURLProps {
    projectURLs: ProjectURLs | undefined | null;
    setProjectURLs: React.Dispatch<React.SetStateAction<ProjectURLs>>;
}

export const EditProjectURL: React.FC<EditProjectURLProps> = ({ projectURLs, setProjectURLs }) => {
    const instruction = "Enter or edit the project URLs.";

    const homepage: ProjectURL | null = projectURLs?.homepage ?? new ProjectURL({ url: '' });
    const ios: ProjectURL | null = projectURLs?.ios ?? new ProjectURL({ url: '' });
    const android: ProjectURL | null = projectURLs?.android ?? new ProjectURL({ url: '' });

    const [homepageURL, setHomepageURL] = useState<string | null>(homepage?.url);
    const [iosURL, setIosURL] = useState<string | null>(ios?.url);
    const [androidURL, setAndroidURL] = useState<string | null>(android?.url);

    const [message, setMessage] = useState<string>(instruction);
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    const handleProjectURLsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        const { name, value } = target;

        switch (name) {
            case 'homepage_url':
                setHomepageURL(value);
                break;

            case 'ios_url':
                setIosURL(value);
                break;

            case 'android_url':
                setAndroidURL(value);
                break;
        }

        setMessage(instruction)
        setMessageType('info')
    };

    const handleUpdateProjectURLs = () => {
        try {
            const updatedProjectURLs = new ProjectURLs();

            if (homepageURL) {
                try {
                    updatedProjectURLs.setHomepage(homepageURL)
                } catch (error) {
                    const err = error as Error;
                    throw new Error(`${err.message} for home page.`);
                }
            }

            if (iosURL) {
                try {
                    updatedProjectURLs.setIos(iosURL)
                } catch (error) {
                    const err = error as Error;
                    throw new Error(`${err.message} for the iOS store.`);
                }
            }

            if (androidURL) {
                try {
                    updatedProjectURLs.setAndroid(androidURL)
                } catch (error) {
                    const err = error as Error;
                    throw new Error(`${err.message} for the Android store.`);
                }
            }

            setProjectURLs(updatedProjectURLs)
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show')
            return;
        }
    };

    return (
        <div className={styles.edit} id='update_urls'>
            <h3>Project URLs</h3>

            <FormLabelInput id="homepage_url" label={homepage.name} text={homepageURL} description={homepage.description} name='homepage_url' change={handleProjectURLsChange} />

            <FormLabelInput id="ios_url" label={ios.name} text={iosURL} description={ios.description} name='ios_url' change={handleProjectURLsChange} />

            <FormLabelInput id="ios_url" label={android.name} text={androidURL} description={android.description} name='android_url' change={handleProjectURLsChange} />

            <StatusBar show={showStatusBar} messageType={messageType} message={message} />

            <button className={styles.button} onClick={handleUpdateProjectURLs}>
                <h3>Update Project Url</h3>
            </button>
        </div>
    )
}