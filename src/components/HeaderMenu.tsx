import { useEffect, useState } from 'react'
import './HeaderMenu.scss'
import type Menu from '../typings/Menu';

const REMOTE_MENU_API_URL = import.meta.env.VITE_BASE_MENU_API_URL;
const HEADER_MENU_ID = import.meta.env.VITE_HEADER_MENU_ID;

function HeaderMenu() {
  const [menu, setMenu] = useState<Menu | undefined>();

  useEffect( () => {
    const url = `${REMOTE_MENU_API_URL}/menus/${HEADER_MENU_ID}/`;
    const fetchData = async() => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setMenu(result);
    };

    fetchData();
  }, []);

  return (
    <header className='site-header'>
      <div className='d-flex flex-column'>
        <nav className='navbar navbar-toggleable-md navbar-custom navbar-light py-2 py-lg-4'>
          <div className='container px-0 px-lg-3'>
            <button className='navbar-toggler ml-auto mr-0 collapsed' type='button' data-toggle='collapse' data-target='#header-menu' aria-controls='header-menu' aria-expanded='false'>
              <span className='navbar-toggler-text'>Navigation</span>
              <span className='navbar-toggler-icon' aria-hidden='true'></span>
            </button>
            <div id='header-menu' className='collapse navbar-collapse'>
              <ul id='menu-header-menu' className='nav navbar-nav nav-fill'>
              {menu && menu.items.map(item => {
                return (
                  <li key={item.id} className='nav-item'>
                    <a className='nav-link' href={item.url}>
                      {item.title}
                    </a>
                  </li>
                );
              })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default HeaderMenu
