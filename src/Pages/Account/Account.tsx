import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AccountTabs from '../../Components/AccountTabs/AccountTabs';
import ValidationContext from '../../Context/ValidationContext';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { AxiosResponse } from 'axios';

export interface RegisterFormProps {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

export interface LoginProps {
  userEmail: string;
}

const Account = () => {
  const data = useContext(ValidationContext);
  const nav = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!data.isValid) {
      axiosPrivate
        .get('/getUsersTodolists')
        .then((response: AxiosResponse) => {
          data.setIsValid(true);
          data.setLists(response.data.lists);
          data.setTodos(response.data.todos);
          nav('/');
        })
        .catch(() => {
          data.setIsValid(false);
          data.setLists([]);
          data.setTodos([]);
        });
    }
  }, []);

  return (
    <>
      <AccountTabs />
      <Outlet />
    </>
  );
};

export default Account;
