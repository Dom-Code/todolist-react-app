import React, { useEffect, useState } from 'react';
import Lists from '../Lists';
import Todos from '../Todos';
// import Todos from './Todos';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';
import '../style/TodoListMain.css';
import useValidation from '../../Hooks/useValidation';
import { Navigate, useNavigate } from 'react-router-dom';

export interface GeneralObject {
  [key: string]: any;
}

export interface ListProps {
  listId: string | null;
  setListId: React.Dispatch<React.SetStateAction<string | null>>;
}

const TodoListMain = () => {
  const [listId, setListId] = useState<null | string>(null);
  const { isValid } = useValidation();
  const nav = useNavigate();

  useEffect(() => {
    if (!isValid) {
      nav('/');
    }
  }, [isValid]);

  return (
    <>
      <h1>My Todo List</h1>
      <Container id='container'>
        <Row>
          <Col id='left-col'>
            <div>List</div>
            <ListGroup id='todoListContainer'>
              <Lists listId={listId} setListId={setListId} />
            </ListGroup>
          </Col>
          <Col id='right-col'>
            {listId ? (
              <ListGroup id='todosContainer'>
                <Todos listId={listId} setListId={setListId} />
              </ListGroup>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TodoListMain;
