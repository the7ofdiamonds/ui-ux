import React, { useEffect } from 'react';

import { Main } from './main/Main';
import { Section } from './section/Section';

interface NotFoundProps {
  title: string | null;
  children?: React.ReactNode;
}

export const NotFound: React.FC<NotFoundProps> = ({ title, children }) => {
  const defaultTitle = "Page Not Found";

  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = defaultTitle;
    }
  }, []);

  return (
    <Section>
      <Main>
        <h2>{title ? title : defaultTitle}</h2>
        {children}
      </Main>
    </Section>
  );
}