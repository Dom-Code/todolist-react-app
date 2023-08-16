import React, { useEffect, useState, useContext } from 'react';
import { Modal, Form, Button, ListGroup } from 'react-bootstrap';
import { GeneralObject } from './Routes/TodoListMain';
import { ListProps } from './Routes/TodoListMain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ValidationContext from '../Context/ValidationContext';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import './style/Lists.css';

export interface currentListIdProps {
  currentListId: null | string;
}

const Lists = ({ listId, setListId }: ListProps) => {
  const showTodoListModal = () => setTodoListModal(true);
  const [previousElement, setPreviousElement] = useState<GeneralObject>();
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
      .then((res) => {
        if (res.status === 200) {
          closeTodoListModal();
          const newList = {
            _id: res.data.listId,
            name: todoListName,
          };
          const listsCopy = data.lists;
          const updatedCopy = [...listsCopy, newList];
          data.setLists(updatedCopy);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteTodoList = (e: any) => {
    axiosPrivate
      .delete('/deleteTodoList', { data: { listId: listId } })
      .then((res) => {
        const lists = data.lists.slice();
        const updatedLists = lists.filter((list) => {
          return listId !== list._id;
        });
        data.setLists(updatedLists);
        setListId(null);
        e.currentTarget?.parentNode.classList.remove('active');
        //removes highlight
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editListName = () => {
    setEditError('');

    axiosPrivate
      .put('/editListName', { data: { listName: editName, listId: listId } })

      .then((res) => {
        closeEditTodoListModal();

        const newList = data.lists.slice();
        const editIndex = newList.findIndex((list) => {
          return list._id === editId;
        });
        newList[editIndex].name = editName;
        // setTempTodoList(newList);
      })
      .catch((err) => {
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
              onSubmit={(e) => {
                e.preventDefault();
                createTodoList();
              }}
            >
              <Form.Group className='mb-3' controlId='formTodoListName'>
                <Form.Label>What is the name of this todo list?</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setTodoListName(e.currentTarget.value);
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
            onSubmit={(e) => {
              e.preventDefault();
              editListName();
            }}
          >
            <Form.Group>
              <Form.Label>Edit your list name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setEditName(e.currentTarget.value);
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
      {data.lists.map((list, i) => {
        return (
          <ListGroup.Item
            id={`${list._id}`}
            key={i}
            onClick={(e) => {
              const clickedElement = e.currentTarget;
              setListId(list._id);
              if (previousElement) {
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
              <FontAwesomeIcon
                icon={faTrash}
                size='sm'
                onClick={(e) => {
                  deleteTodoList(e);
                  e.stopPropagation();
                }}
              />
            ) : null}
          </ListGroup.Item>
        );
      })}
      <br />
      <Button
        onClick={() => {
          showTodoListModal();
        }}
      >
        Add todolist
      </Button>
    </>
  );
};

export default Lists;
