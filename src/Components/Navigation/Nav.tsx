// import React from 'react';

import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';

const Nav = () => {
  return (
    <div>
      <div id='nav-icons'>
        <Link className='nav-item' to={'/'}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link className='nav-item' to={'/account'}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Nav;
