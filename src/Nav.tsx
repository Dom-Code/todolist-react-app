import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import useValidation from './Hooks/useValidation';

const Nav = () => {
  const { isValid } = useValidation();
  return (
    <div>
      {isValid ? (
        <>
          <Link to={'/'}>Home</Link> | <Link to={'/todolists'}>Lists</Link> |{' '}
          <Link to={'/account'}>Account</Link>
        </>
      ) : (
        <>
          <Link to={'/'}>Home</Link> | <Link to={'/account'}>Account</Link>
        </>
      )}
      {/* <Link to={'/'}>Home</Link> | <Link to={'/account'}>Account</Link> */}
      <Outlet />
    </div>
  );
};

export default Nav;
