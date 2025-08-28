import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { ImageComponent } from '@/views/image/ImageComponent';

import { Image } from '@/model/Image';
import { Menu } from '@/model/Menu';

import styles from './Header.module.scss';

interface HeaderComponentProps {
  branding: string | Image;
  leftMenu: Menu | null;
  centerMenu: Menu | null;
  rightMenu: Menu | null;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ branding, leftMenu, centerMenu, rightMenu }) => {
  const [dropdown, setDropdown] = useState('hide');

  const toggleMenu = () => {
    if (dropdown == 'hide') {
      setDropdown('show');
    } else {
      setDropdown('hide');
    }
  };

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.top}>
          <div className={styles.leftSide}>

            <div className={styles['left-menu']} id="left-menu">
              {leftMenu && leftMenu.links.length > 0 &&
                leftMenu.links.map((link, index) => (
                  <Link to={link.href} onClick={toggleMenu} key={index}>
                    {link.text && <h2 className={styles.title}>{link.text}</h2>}
                  </Link>
                ))}
            </div>
          </div>

          <div className={styles.center}>
            <Link to="/" onClick={toggleMenu}>
              {typeof branding === 'string' ?
                (<h1 className={styles['header-title']}>{branding}</h1>)
                : (
                  <ImageComponent image={branding} />
                )}
            </Link>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.hamburger} id="toggle" onClick={toggleMenu}>
              <h1 className={styles.open} id="open">
                III
              </h1>

              <h1 className={styles.close} id="close">
                X
              </h1>
            </div>

            <div className={styles['right-menu']} id="right-menu">
              {rightMenu && rightMenu.links.length > 0 &&
                rightMenu.links.map((link, index) => (
                  <Link to={link.href} onClick={toggleMenu} key={index}>
                    {link.text && <h2 className={styles.title}>{link.text}</h2>}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {dropdown == 'show' && (
          <nav className={styles.dropdown} id="dropdown">
            <ul className="links">
              {centerMenu && centerMenu.links.length > 0 &&
                centerMenu.links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} onClick={toggleMenu}>
                      {link.text && <h2 className={styles.title}>{link.text}</h2>}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}