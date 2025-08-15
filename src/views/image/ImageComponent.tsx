import React from 'react';

import { IconComponent } from '@/views/icon/IconComponent';

import { Image } from '@/model/Image';

import styles from './Image.module.scss';

interface ImageComponentProps {
  image: Image
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ image }) => {
  const { type, title, className, url, data } = image;

  return type === 'svg+xml' && data ?
    (<span className={`${styles[`${className}`]}`} dangerouslySetInnerHTML={{ __html: data }} />) : url ? (
      <img className={styles.img} src={url} alt={title ?? ''} title={title ?? ''} />
    ) : (
      className && <IconComponent icon={image} />
    );
}