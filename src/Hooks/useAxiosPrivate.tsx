import axiosPrivate from '../Services/axiosPrivate';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import useValidation from './useValidation';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken, setAccessToken } = useValidation();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (!sessionStorage.getItem('todolistRefreshToken')) {
          throw new Error('No refresh token');
        }

        // if a refresh token does not exist, throw error.
        // console.log(`Original Access Token ${accessToken}`);
        if (!config.headers['Authorization']) {
          if (accessToken.length === 0) {
            console.log('Request for new access token');
            const newAccessToken = await refresh();
            config.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken.data.accessToken}`;
            // console.log(`New Access token: ${newAccessToken.data.accessToken}`);
            setAccessToken(newAccessToken.data.accessToken);
          } else {
            console.log('Access token accepted');
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }

          // if access token is a string with a length of 0, get new access token with refresh token.
          // An request with out an access token cannot be sent. If refresh cannot get new access token,
          // refresh will throw an error.
        }
        return config;
      },
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );

    const responseIntecept = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (err) => {
        console.log(err);
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          setAccessToken(newAccessToken.data.accessToken);

          prevRequest.headers[
            'Authorization'
          ] = `Bearer ${newAccessToken.data?.accessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntecept);
    };
  }, [accessToken, refresh, setAccessToken]);
  return axiosPrivate;
};

export default useAxiosPrivate;
