import React, { useEffect, useState } from 'react';
import type { AsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';

import { marked } from 'marked';

import styles from './Content.module.scss';

interface ContentComponentProps<T> {
  content?: string | null;
  query?: T;
  dispatch?: ThunkDispatch<any, any, any>;
  getFile?: AsyncThunk<string | null, T, {}>;
  title?: string | null;
}

export const ContentComponent = <T,>({ content, query, dispatch, getFile, title }: ContentComponentProps<T>) => {
  const [contentQuery, setContentQuery] = useState<T | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [html, setHTML] = useState<string | object | null>(null);

  useEffect(() => {
    if (!content && query) {
      setContentQuery(query);
    }
  }, [content, query]);

  useEffect(() => {
    let isMounted = true;

    if (contentQuery && dispatch && getFile) {
      try {
        dispatch(getFile(contentQuery))
          .unwrap()
          .then((file) => {
            if (file) {
              setFile(file)
            } else {
              return null;
            }
          })
          .catch(console.error);
      } catch (error) {
        console.error(error)
      }
    }

    return () => {
      isMounted = false;
    };
  }, [contentQuery, dispatch, getFile]);

  useEffect(() => {
    if (content) {
      try {
        const htmlContent = marked.parse(content);

        if (htmlContent) {
          setHTML(htmlContent);
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [content]);

  useEffect(() => {
    if (file) {
      try {
        const htmlContent = marked.parse(file);

        if (htmlContent) {
          setHTML(htmlContent);
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [file]);

  return (
    <>
      {html && html != "" && (
        <div className={styles.content}>
          {title && <h4 className='title'>{title}</h4>}
          <div className={styles['content-html']} dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      )}
    </>
  );
};