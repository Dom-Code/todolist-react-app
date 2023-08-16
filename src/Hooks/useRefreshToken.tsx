import axios from 'axios';
import ValidationContext from '../Context/ValidationContext';
import { useContext } from 'react';

const useRefreshToken = () => {
  const data = useContext(ValidationContext);

  const refresh = async () => {
    const refreshToken = sessionStorage.getItem('todolistRefreshToken');
    const response = await axios
      .post('http://localhost:4000/api/refresh', {
        // withCredentials: true,
        token: refreshToken,
      })
      .then((res) => {
        data.setAccessToken(res.data.accessToken);
        return res;
      })
      .catch((err) => {
        data.setAccessToken('');
        data.setIsValid(false);
        data.setLists([]);
        data.setTodos([]);

        return err;
        // if refresh token is expired or not accepted by API, user is rerouted to login page.
      });

    // console.log(response);
    return response;
  };
  return refresh;
};

export default useRefreshToken;
