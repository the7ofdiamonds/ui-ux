import React, { useEffect } from 'react';

import { Main } from './main/Main';
import { Section } from './section/Section';

interface NotFoundProps {
  title: string | null;
  children?: React.ReactNode;
}

export const NotFound: React.FC<NotFoundProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <Section>
      <Main>
        <h2>{title}</h2>
        {children}
      </Main>
    </Section>
  );
}