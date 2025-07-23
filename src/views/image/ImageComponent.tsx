import React from 'react';

import { IconComponent } from '@/views/icon/IconComponent';

import { Image } from '@/model/Image';

import styles from './Image.module.scss';

interface ImageComponentProps {
  image: Image
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ image }) => {
  const { title, className, url } = image;

  return url ? (
    <img className={styles.image} src={url} alt={title ?? ''} title={title ?? ''} />
  ) : (
    className && <IconComponent icon={image} />
  );
}