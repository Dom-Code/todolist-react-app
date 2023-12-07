import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ValidationContext from './Context/ValidationContext';
import { IList, Todo } from './Context/ValidationContext';
import Nav from './Components/Navigation/Nav';
import Account from './Pages/Account/Account';
import Login from './Components/Login/Login';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import TodoListMain from './Components/Todolist/TodoListMain';
import Register from './Components/Register/Register';
import Logout from './Components/Logout/Logout';
import AccountHome from './Pages/Account/AccountHome';

function App() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [lists, setLists] = useState<Array<IList>>([]);
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [userName, setUserName] = useState<string>('');
  const userContext = {
    accessToken,
    setAccessToken,
    isValid,
    setIsValid,
    lists,
    setLists,
    todos,
    setTodos,
    userName,
    setUserName,
  };

  const router = createHashRouter(
    [
      {
        path: '/',
        element: <Nav />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> },
          { path: 'todolists', element: <TodoListMain /> },

          {
            path: 'account',
            element: <Account />,
            errorElement: <ErrorPage />,
            children: [
              { path: '', element: <AccountHome /> },
              { path: 'login', element: <Login /> },
              { path: 'register', element: <Register /> },
              { path: 'logout', element: <Logout /> },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <ErrorPage />,
        errorElement: <ErrorPage />,
      },
    ],
    { basename: '/' }
  );

  return (
    <div className='App'>
      <ValidationContext.Provider value={userContext}>
        <RouterProvider router={router} />
      </ValidationContext.Provider>
    </div>
  );
}

export default App;
