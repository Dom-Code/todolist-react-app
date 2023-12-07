import { Outlet } from 'react-router-dom';
import AccountTabs from '../../Components/AccountTabs/AccountTabs';

export interface RegisterFormProps {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

export interface LoginProps {
  userEmail: string;
}

const Account = () => {
  return (
    <>
      <AccountTabs />
      <Outlet />
    </>
  );
};

export default Account;
