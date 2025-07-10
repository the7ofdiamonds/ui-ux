import React, { useEffect, useState } from 'react';

import { Image } from '@/model/Image';

import styles from './Icon.module.scss';

interface IconComponentProps {
  imageClass: Image;
}

export const IconComponent: React.FC<IconComponentProps> = ({ imageClass }) => {
  const [image, setImage] = useState<Image>(imageClass);

  useEffect(() => { setImage(imageClass) }, [imageClass, setImage]);

  return (
    <>
      {
        image?.className && (
          <i className={`${image.className} ${styles.i}`} title={image.title ?? ''}></i>
        )}
    </>
  );
}