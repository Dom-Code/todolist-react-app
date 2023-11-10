import { useEffect, useState, useContext, FormEvent } from 'react';
import {
  Modal,
  Form,
  Button,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { ListProps } from '../TodoListMain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ValidationContext from '../../../Context/ValidationContext';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import './Lists.css';
import { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';

export interface currentListIdProps {
  currentListId: null | string;
}

const Lists = ({ listId, setListId }: ListProps) => {
  const showTodoListModal = () => setTodoListModal(true);
  const [previousElement, setPreviousElement] = useState<Element>();
  const data = useContext(ValidationContext);
  const axiosPrivate = useAxiosPrivate();

  //add new list
  const [todoListName, setTodoListName] = useState('');
  const [todoListModal, setTodoListModal] = useState(false); //create new list
  const [todoListSubmitted, setTodoListSubmitted] = useState(false);
  const closeTodoListModal = () => {
    setTodoListModal(false);
    setTodoListSubmitted(false);
  };
  const submitDisabled = todoListName.length === 0;

  //edit list name
  const [currentName, setCurrentName] = useState('');
  const [editName, setEditName] = useState('');
  const [editId, setEditId] = useState('');
  const [editListModal, setEditListModal] = useState(false);
  const [editError, setEditError] = useState('');
  const closeEditTodoListModal = () => {
    setEditListModal(false);
    setEditError('');
  };
  const [editSubmitDisabled, setEditSubmitDisabled] = useState(true);

  const createTodoList = () => {
    axiosPrivate
      .post('/createTodoList', { data: { name: todoListName } })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          closeTodoListModal();
          const newList = {
            _id: res.data.listId,
            name: todoListName,
            createAt: '',
            todos: [],
            user_id: '',
            __v: 0,
            updatedAt: null,
          };
          const listsCopy = data.lists;
          const updatedCopy = [...listsCopy, newList];
          data.setLists(updatedCopy);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  };

  const deleteTodoList = (e: React.MouseEvent) => {
    const target = e.currentTarget as Element;
    const parent = target.parentElement;
    axiosPrivate
      .delete('/deleteTodoList', { data: { listId: listId } })
      .then(() => {
        const lists = data.lists.slice();
        const updatedLists = lists.filter((list) => {
          return listId !== list._id;
        });
        data.setLists(updatedLists);
        setListId(null);
        parent?.classList.remove('active');
        //removes highlight
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  const editListName = () => {
    setEditError('');

    axiosPrivate
      .put('/editListName', { data: { listName: editName, listId: listId } })

      .then(() => {
        closeEditTodoListModal();

        const newList = data.lists.slice();
        const editIndex = newList.findIndex((list) => {
          return list._id === editId;
        });
        newList[editIndex].name = editName;
        // setTempTodoList(newList);
      })
      .catch((err: AxiosError) => {
        setEditError(err.message);
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (editName === currentName) {
      setEditSubmitDisabled(true);
    }

    if (editName !== currentName) {
      setEditSubmitDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editName]);

  return (
    <>
      <Modal show={todoListModal} onHide={closeTodoListModal}>
        <Modal.Header closeButton></Modal.Header>
        {todoListSubmitted ? (
          <Modal.Body>Todolist was created.</Modal.Body>
        ) : (
          <Modal.Body>
            <Form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                createTodoList();
              }}
            >
              <Form.Group className='mb-3' controlId='formTodoListName'>
                <Form.Label>What is the name of this todo list?</Form.Label>
                <Form.Control
                  onChange={(e: FormEvent) => {
                    const target = e.currentTarget as HTMLInputElement;
                    setTodoListName(target.value);
                  }}
                  type='text'
                  placeholder='Todo list name'
                />
              </Form.Group>
              <Button disabled={submitDisabled} variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        )}
      </Modal>
      <Modal show={editListModal} onHide={closeEditTodoListModal}>
        <Modal.Header closeButton>
          {' '}
          {editError.length > 0 ? <div id='edit-error'>{editError}</div> : null}
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              editListName();
            }}
          >
            <Form.Group>
              <Form.Label>Edit your list name</Form.Label>
              <Form.Control
                onChange={(e: FormEvent) => {
                  const target = e.currentTarget as HTMLInputElement;
                  setEditName(target.value);
                }}
                type='text'
                value={editName}
              ></Form.Control>
            </Form.Group>
            <div id='edit-buttons'>
              <Button
                id='submit-edit-button'
                disabled={editSubmitDisabled}
                variant='primary'
                type='submit'
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <div id='lists'>
        {data.lists.map((list, i) => {
          return (
            <ListGroup.Item
              id={`${list._id}`}
              key={i}
              onClick={(e: React.MouseEvent) => {
                const clickedElement = e.currentTarget as Element;
                setListId(list._id);
                if (previousElement && clickedElement) {
                  previousElement.classList.remove('active');
                  clickedElement.classList.add('active');
                  setPreviousElement(clickedElement);
                  // load();
                } else {
                  clickedElement.classList.add('active');
                  setPreviousElement(clickedElement);
                }
              }}
              action
              className='listItem'
            >
              <div
                className='list-name'
                onClick={() => {
                  setCurrentName(list.name);
                  setEditName(list.name);
                  setEditId(list._id);
                  setEditListModal(true);
                }}
              >
                {list.name}
              </div>

              {list._id === listId ? (
                <OverlayTrigger
                  placement='top'
                  overlay={<Tooltip>Delete</Tooltip>}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    size='sm'
                    onClick={(e: React.MouseEvent) => {
                      deleteTodoList(e);
                      e.stopPropagation();
                    }}
                  />
                </OverlayTrigger>
              ) : null}
            </ListGroup.Item>
          );
        })}
        <br />
        <Button
          id='add-button'
          onClick={() => {
            showTodoListModal();
          }}
        >
          Add todolist
        </Button>
      </div>
    </>
  );
};

export default Lists;
