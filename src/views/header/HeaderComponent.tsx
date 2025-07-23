import React, { useState } from 'react';

import { ImageComponent } from '@/views/image/ImageComponent';

import { Image } from '@/model/Image';
import { Link } from '@/model/Link';

import styles from './Header.module.scss';

interface HeaderComponentProps {
  branding: string | Image;
  leftMenu: Array<Link> | null;
  centerMenu: Array<Link> | null;
  rightMenu: Array<Link> | null;
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
    <>
      <header>
        <div className={styles.header}>
          <div className={styles.top}>
            <div className={styles.leftSide}>

              <div className={styles['left-menu']} id="left-menu">
                {leftMenu && leftMenu.length > 0 &&
                  leftMenu.map((link, index) => (
                    <a href={link.href} onClick={toggleMenu} key={index}>
                      {link.text && <h2 className={styles.title}>{link.text}</h2>}
                    </a>
                  ))}
              </div>
            </div>

            <div className={styles.center}>
              <a href="/">
                {typeof branding === 'string' ?
                  (<h1 className={styles['header-title']}>{branding}</h1>)
                  : (
                    <ImageComponent image={branding} />
                  )}
              </a>
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
                {rightMenu && rightMenu.length > 0 &&
                  rightMenu.map((link, index) => (
                    <a href={link.href} onClick={toggleMenu} key={index}>
                      {link.text && <h2 className={styles.title}>{link.text}</h2>}
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {dropdown == 'show' && (
            <nav className={styles.dropdown} id="dropdown">
              <ul className="links">
                {centerMenu && centerMenu.length > 0 &&
                  centerMenu.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} onClick={toggleMenu}>
                        {link.text && <h2 className={styles.title}>{link.text}</h2>}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}