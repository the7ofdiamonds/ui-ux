import React from 'react';

import { Button } from './Button';

import { ImageComponent } from '@/views/image/ImageComponent';

import { Image } from '@/model/Image';

interface ButtonImageExternalProps {
    action: () => void;
    description?: string;
    image: Image;
    name: string;
    url: string;
}

export const ButtonIcon: React.FC<ButtonImageExternalProps> = ({ description,image,name,url }) => {

    return (
        <>
            {url &&
                <Button
                    action={() => window.open(url, '_blank')}
                    title={description ?? name}>
                    <ImageComponent image={image} />
                    <h3>{`${name}`}</h3>
                </Button>
            }
        </>
    )
}