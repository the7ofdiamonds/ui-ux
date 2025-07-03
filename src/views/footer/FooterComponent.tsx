import React from 'react';

interface FooterComponentProps {
  children?: React.ReactNode;
  name: string;
}

export const FooterComponent: React.FC<FooterComponentProps> = ({ children, name }) => {
  const year = new Date().getFullYear();

  return (
    <footer>
      {children}
      <span className="legal">© Copyright 2010 - {year} {name}. All Rights Reserved.</span>
    </footer>
  );
}