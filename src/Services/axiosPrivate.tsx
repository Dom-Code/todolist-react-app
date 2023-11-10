import axios from 'axios';

export default axios.create({
  baseURL: 'https://haunted-wizard-63978-48bf82cc3a5b.herokuapp.com/',
});

export const axiosPrivate = axios.create({
  // baseURL: 'http://localhost:4000/api',

  baseURL: 'https://haunted-wizard-63978-48bf82cc3a5b.herokuapp.com/',
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,

  // need to fix CORS
});

/* to set the data being sent to the API, the data object on the axios
 config method and is passed as an argument to the axios instane `api`. 
 for example: 
    In `Todos.tsx`, we create an object of the `AxiosRequestConfig` type and set 
    data to the name of the todo and the listId. This is how the axios intercepter 
    can send our todo data to the API. 
 */
