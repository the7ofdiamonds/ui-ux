import React, { useState, useEffect } from 'react';

import { IconComponent } from '../../views/icon/IconComponent';

import { Image } from '../../model/Image';

import styles from './Image.module.scss';

interface ImageComponentProps {
  image: Image | null;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ image }) => {
  const [className, setClassName] = useState<string | null>(image?.className);
  const [url, setUrl] = useState<string | null>(image?.url);
  const [type, setType] = useState<string | null>(image?.type);
  const [title, setTitle] = useState<string | null>(image?.title);
  const [svg, setSvg] = useState<string | null>(image?.data);

  useEffect(() => {
    if (image?.className) {
      setClassName(image?.className);
    }
  }, [image?.className]);

  useEffect(() => {
    if (image && !image.className) {
      setClassName(image.createClassName());
    }
  }, [image]);

  useEffect(() => {
    if (image) {
      setUrl(image.url);
    }
  }, [image]);

  useEffect(() => {
    if (image) {
      setType(image.type);
    }
  }, [image]);

  useEffect(() => {
    if (image) {
      setTitle(image.title);
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