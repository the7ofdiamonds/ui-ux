import React from 'react'

import { SiteMap } from '@/model/SiteMap'

interface SiteMapComponentProps {
    siteMap: SiteMap;
}

export const SiteMapComponent: React.FC<SiteMapComponentProps> = ({ siteMap }) => {
    console.log(siteMap)
    return (
        <div>SiteMapComponent</div>
    )
}