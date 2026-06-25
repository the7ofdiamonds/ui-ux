import React, { useState, useEffect } from 'react';

import { IconComponent } from '../../views/icon/IconComponent';

import { Image } from '../../model/Image';

import styles from './Image.module.scss';

interface ImageComponentProps {
  image: Image
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ image }) => {
  const [svg, setSvg] = useState<string | null>(image.data);

  const { className, url, type, title } = image;

  useEffect(() => {
    if (image && !image.className) {
      image.createClassName();
    }
  }, [image]);

  useEffect(() => {
    if (url && type === "svg") {
      const getSVG = async (url: string) => {
        return await image.createHTMLElement(url).catch(() => null);
      };

      getSVG(url).then(setSvg).catch(() => setSvg(null));
    }
  }, [url, type]);

  if (type === "svg" && svg) {

    return (
      <span
        className={styles[`${className}`]}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  if (url) {
    return (
      <img
        className={styles.img}
        src={url}
        alt={title ?? ""}
        title={title ?? ""}
      />
    );
  }

  if (className) {
    return <IconComponent icon={image} />;
  }

  return null;
}