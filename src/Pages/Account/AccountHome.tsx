import { useContext } from 'react';
import ValidationContext from '../../Context/ValidationContext';

const AccountHome = () => {
  const data = useContext(ValidationContext);

  return <div>Welcome {data.userName}</div>;
};

export default AccountHome;
