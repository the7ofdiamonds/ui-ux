import React from 'react';

import { Button } from './Button';

import { ImageComponent } from '../../views/image/ImageComponent';

import { Image } from '../../model/Image';

interface ButtonImageExternalProps {
    action?: () => void;
    description?: string;
    image: Image | null;
    name: string | null;
}

export const ButtonImage: React.FC<ButtonImageExternalProps> = ({ action, description, image, name }) => {
    return (
        <Button
            action={action}
            title={description ?? name}>
            {image && <ImageComponent image={image} />}
        </Button>
    )
}