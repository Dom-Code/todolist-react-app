import React, { useContext, useEffect } from 'react';
import ValidationContext from '../../Context/ValidationContext';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { AxiosResponse } from 'axios';

const Home = () => {
  const data = useContext(ValidationContext);
  const axiosPrivate = useAxiosPrivate();

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
      .catch((err) => {
        console.log(err);
        data.setIsValid(false);
        data.setLists([]);
        data.setTodos([]);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>This is a simple Todo list using React</h3>
      {/* <TodoListMain /> */}
    </>
  );
};

export default Home;
