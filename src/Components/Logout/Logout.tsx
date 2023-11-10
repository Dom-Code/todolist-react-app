import { useContext, useEffect } from 'react';
import ValidationContext from '../../Context/ValidationContext';

const Logout = () => {
  const data = useContext(ValidationContext);

  useEffect(() => {
    data.setIsValid(false);
    data.setTodos([]);
    data.setLists([]);
    data.setAccessToken('');
    sessionStorage.removeItem('todolistRefreshToken');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>You have been logged out.</h3>
    </>
  );
};

export default Logout;
