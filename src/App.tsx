// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Routes/Home';
import ValidationContext from './Context/ValidationContext';
import { IList, Todo } from './Context/ValidationContext';
import Nav from './Nav';
import Account from './Components/Routes/Account';
import Login from './Components/Routes/Login';
import ErrorPage from './Components/Routes/ErrorPage';
import TodoListMain from './Components/Routes/TodoListMain';
import Register from './Components/Routes/Register';
import Logout from './Components/Routes/Logout';

function App() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [lists, setLists] = useState<Array<IList>>([]);
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const userContext = {
    accessToken,
    setAccessToken,
    isValid,
    setIsValid,
    lists,
    setLists,
    todos,
    setTodos,
  };

  const router = createBrowserRouter([
    {
      path: '/todolist-react-app',
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
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'logout', element: <Logout /> },
          ],
        },
      ],
    },
  ]);

  return (
    <div className='App'>
      <ValidationContext.Provider value={userContext}>
        <RouterProvider router={router} />
      </ValidationContext.Provider>
    </div>
  );
}

export default App;
