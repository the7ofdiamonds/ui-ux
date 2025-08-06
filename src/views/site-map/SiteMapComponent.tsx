import React from 'react'

import { SiteMap } from '@/model/SiteMap'

import styles from './SiteMap.module.scss';

interface SiteMapComponentProps {
    siteMap: SiteMap;
}

export const SiteMapComponent: React.FC<SiteMapComponentProps> = ({ siteMap }) => {
    return (
        <div className={styles["site-map"]}>
            {siteMap.info.length > 0 && (
                <div className={styles['site-map-info']}>
                    <h5 className='title'>info</h5>
                    <div className={styles['site-map-info-links']}>
                        <ul>
                            {siteMap.info.map((link) => (
                                <li key={link.href}><a href={link.href}>{link.text}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>)}

            {siteMap.communication.length > 0 && (
                <div className={styles['site-map-communication']}>
                    <h5 className='title'>communication</h5>
                    <div className={styles['site-map-communication-links']}>
                        <ul>
                            {siteMap.communication.map((link) => (
                                <li key={link.href}><a href={link.href}>{link.text}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>)}

            {siteMap.account.length > 0 && (
                <div className={styles['site-map-account']}>
                    <h5 className='title'>account</h5>
                    <div className={styles['site-map-account-links']}>
                        <ul>
                            {siteMap.account.map((link) => (
                                <li key={link.href}><a href={link.href}>{link.text}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>)}

            {siteMap.offer.length > 0 && (
                <div className={styles['site-map-offer']}>
                    <h5 className='title'>offer</h5>
                    <div className={styles['site-map-offer-links']}>
                        <ul>
                            {siteMap.offer.map((link) => (
                                <li key={link.href}><a href={link.href}>{link.text}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>)}
        </div>
    )
}