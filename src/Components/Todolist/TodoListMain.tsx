import { useState } from 'react';
import Lists from './Lists/Lists';
import Todos from './Todos/Todos';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';
import './TodoListMain.css';
export interface GeneralObject {
  key: string;
}

export interface ListProps {
  listId: string | null;
  setListId: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface TodosProps {
  listId: string | null;
}

const TodoListMain = () => {
  const [listId, setListId] = useState<null | string>(null);

  // useEffect(() => {
  //   if (!isValid) {
  //     nav('/todolist-react-app');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isValid]);

  return (
    <>
      <div id='title'>
        <h1>My Todo List</h1>
      </div>
      <Container id='container'>
        <Row xs={1} md={2} id='lists-todos'>
          <Col className='cols'>
            <div className='container-title'>List</div>
            <ListGroup>
              <Lists listId={listId} setListId={setListId} />
            </ListGroup>
          </Col>

          <Col className='cols'>
            <div className='container-title'>Todos</div>
            {listId ? (
              <ListGroup>
                <Todos listId={listId} />
              </ListGroup>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TodoListMain;
