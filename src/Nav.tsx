// import React from 'react';

import { Outlet, Link } from 'react-router-dom';
import useValidation from './Hooks/useValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const Nav = () => {
  const { isValid } = useValidation();
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
    // <div>
    //   {isValid ? (
    //     <div classlist='nav-icons'>
    //       <Link to={'/'}>
    //         <FontAwesomeIcon icon={faHome} />
    //       </Link>
    //       <Link to={'/todolists'}>Lists</Link>
    //       <Link to={'/account'}>
    //         <FontAwesomeIcon icon={faUser} />
    //       </Link>
    //     </div>
    //   ) : (
    //     <div>
    //       <Link to={'/'}>
    //         <FontAwesomeIcon icon={faHome} />
    //       </Link>
    //       <Link to={'/account'}>
    //         <FontAwesomeIcon icon={faUser} />
    //       </Link>
    //     </div>
    //   )}
    //   {/* <Link to={'/'}>Home</Link> | <Link to={'/account'}>Account</Link> */}
    //   <Outlet />
    // </div>
  );
};

export default Nav;
