import React, { useContext, useEffect } from 'react';
import ValidationContext from '../../Context/ValidationContext';

const Logout = () => {
  const data = useContext(ValidationContext);

  useEffect(() => {
    data.setIsValid(false);
    data.setTodos([]);
    data.setLists([]);
    data.setAccessToken('');
    sessionStorage.removeItem('todolistRefreshToken');
  }, []);

  return (
    <>
      <h3>You have been logged out.</h3>
    </>
  );
};

export default Logout;
