import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ValidationContext from '../../Context/ValidationContext';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { AxiosResponse } from 'axios';
import TodoListMain from '../../Components/Todolist/TodoListMain';
import useValidation from '../../Hooks/useValidation';
import './Home.css';

const Home = () => {
  const data = useContext(ValidationContext);
  const axiosPrivate = useAxiosPrivate();
  const { isValid } = useValidation();
  const nav = useNavigate();

  useEffect(() => {
    // Would like to add a counter. Currently when user clicks on home, data
    // access token is confirmed by sending an API request.
    // Perhaps after a certain number of redirects to home, check for access token.
    axiosPrivate
      .get('/getUsersTodolists')
      .then((response: AxiosResponse) => {
        data.setIsValid(true);
        data.setLists(response.data.lists);
        data.setTodos(response.data.todos);
        // navigate('/todolists');
      })
      .catch(() => {
        data.setIsValid(false);
        data.setLists([]);
        data.setTodos([]);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navToRegister = () => {
    nav('/account/register');
  };

  return (
    <div id='home'>
      {isValid ? (
        <TodoListMain />
      ) : (
        <div id='home-text'>
          <h3>This is a simple Todo List using React</h3>
          <p>
            Please <Link to='/account/register'>Create an account</Link> or{' '}
            <Link to='/account/login'>Login</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
