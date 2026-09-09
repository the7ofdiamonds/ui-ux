import React from 'react';

import { ImageComponent } from '../../image/ImageComponent';
import { Image } from '../../../model/Image';

import styles from './HeaderImage.module.scss';

interface HeaderImageComponentProps {
  className?: string | null;
  title?: string | null;
  image?: Image | null;
}

export const HeaderImageComponent: React.FC<HeaderImageComponentProps> = ({ className, title, image }) => {

  return (
    <div className={`${styles['header-image']} ${className ?? ''}`}>
      {title && <h1 className="title">{title}</h1>}
      {image && <ImageComponent image={image} />}
    </div>
  );
}