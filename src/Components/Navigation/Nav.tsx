// import React from 'react';

import { Outlet, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import { useEffect, useContext, useState } from 'react';
import ValidationContext from '../../Context/ValidationContext';

const Nav = () => {
  const data = useContext(ValidationContext);
  const [accountURL, setAccountURL] = useState('account/login');
  const location = useLocation();

  useEffect(() => {
    data.isValid ? setAccountURL('/account') : setAccountURL('account/login');
  });
  return (
    <div>
      <div id='nav-icons'>
        <Link className='nav-item' to={'/'}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link
          onClick={(e) => {
            if (location.pathname.split('/')[1] === 'account') {
              e.preventDefault();
            }
          }}
          /* if URL pathname is 'account', this link is disabled. 
         The default action for clicking the account icon is to go to account component
         and open login path when user is not logged in. If user is anywhere in account
         component and clicks the aaccount icon, they would be redirected to login. This 
         prevents that action. 
          */
          className='nav-item'
          to={accountURL}
        >
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Nav;
