import { useEffect, useState } from 'react'
import './Footer.scss'
import type Menu from '../typings/Menu';

const REMOTE_MENU_API_URL = import.meta.env.VITE_BASE_MENU_API_URL;
const FOOTER_MENU_ID = import.meta.env.VITE_FOOTER_MENU_ID;
const SOCIAL_MENU_ID = import.meta.env.VITE_SOCIAL_MENU_ID;

function Footer() {
  const [socialMenu, setSocialMenu] = useState<Menu>();
  const [footerMenu, setFooterMenu] = useState<Menu>();

  useEffect( () => {
    const url = `${REMOTE_MENU_API_URL}/menus/${SOCIAL_MENU_ID}/`;
    const fetchData = async() => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSocialMenu(result);
    };

    fetchData();
  }, []);

  useEffect( () => {
    const url = `${REMOTE_MENU_API_URL}/menus/${FOOTER_MENU_ID}/`;
    const fetchData = async() => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setFooterMenu(result);
    };

    fetchData();
  }, []);

  return (
    <footer className="ucf-footer mt-auto">
      <a className="ucf-footer-title" href="https://www.ucf.edu/">University of Central Florida</a>
      <ul className="ucf-footer-social">
        {socialMenu && socialMenu.items.map(item => {
          return (
            <li key={item.id} className="ucf-footer-social-item">
              <a className="ucf-footer-social-link" href={item.url} target={item.target} aria-label={item.title}></a>
            </li>
          );
        })}
      </ul>
      <ul className="ucf-footer-nav">
        {footerMenu && footerMenu.items.map(item => {
          return (
            <li key={item.id} className="ucf-footer-nav-item">
              <a href={item.url} className="ucf-footer-nav-link">{item.title}</a>
            </li>
          );
        })}
      </ul>
      <p className="ucf-footer-address">
        4000 Central Florida Blvd. Orlando, Florida, 32816 | <a rel="nofollow" href="tel:4078232000">407.823.2000</a>
        <br />
        &copy; <a href="https://www.ucf.edu/">University of Central Florida</a>
      </p>
    </footer>
  )
}

export default Footer
