import React, { useEffect, useState } from 'react';

import { Image } from '@/model/Image';

import styles from './Icon.module.scss';

interface IconComponentProps {
  icon: Image;
}

export const IconComponent: React.FC<IconComponentProps> = ({ icon }) => {

  return (
    <>
      {
        icon?.className && (
          <i className={`${icon.className} ${styles.icon}`} title={icon.title ?? ''}></i>
        )}
    </>
  );
}