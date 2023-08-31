import { useState, useEffect, useCallback, useContext } from 'react';
import {
  Button,
  Modal,
  Form,
  ListGroup,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import './style/Todos.css';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareXmark,
  faTrash,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { AxiosRequestConfig } from 'axios';
import ValidationContext from '../Context/ValidationContext';
import { TodosProps } from './Routes/TodoListMain';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import { AxiosError, AxiosResponse } from '../../node_modules/axios/index';
import { Todo } from '../Context/ValidationContext';
import * as React from 'react';

const Todos = ({ listId }: TodosProps) => {
  const [todoError, setTodoError] = useState(false);
  const [completeTodos, setCompleteTodos] = useState<Array<Todo>>([]);
  const [incompleteTodos, setIncompleteTodos] = useState<Array<Todo>>([]);
  const [todoId, setTodoId] = useState<null | string>('');
  const [todoSubmitted, setTodoSubmitted] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [editSubmitDisabled, setEditSubmitDisabled] = useState(true);
  const [clickedElement, setClickedElement] = useState<Element | null>(null);
  const data = useContext(ValidationContext);
  const axiosPrivate = useAxiosPrivate();

  //edit name modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState<string>('');
  const [editName, setEditName] = useState<string>('');
  const [editCompleted, setEditCompleted] = useState<boolean>(true);
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  // add todo modal
  const [todoName, setTodoName] = useState('');
  const [showTodoModal, setShowTodoModal] = useState(false);
  const closeTodoModal = () => {
    setShowTodoModal(false);
  };

  interface ConfigData {
    name: string | null;
    listId: string | null;
    todoId: string | null;
    completed: boolean | null;
  }

  interface AxiosConfig extends AxiosRequestConfig {
    data: ConfigData;
  }

  const config: AxiosConfig = {
    data: {
      name: todoName,
      listId,
      todoId,
      completed: null,
    },
  };

  const createTodo = (name: string) => {
    // config file is used to pass set the data object of axios request.
    axiosPrivate
      .post('/createTodo', config)
      .then((res: AxiosResponse) => {
        const newTodo: Todo = {
          name: name,
          list_id: listId,
          _id: res.data.todoId,
          completed: false,
          data: undefined,
          updatedAt: undefined,
          _v: undefined,
          createAt: undefined,
        };
        data.setTodos([...data.todos, newTodo]);
        setTodoId('');
        setTodoError(false);
        setTodoSubmitted(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        setTodoError(true);
      });
  };

  const deleteTodo = (id: string) => {
    axiosPrivate
      .delete('/deleteTodo', config)
      .then(() => {
        const newList = data.todos.filter((todo) => {
          return todo._id !== id;
        });
        data.setTodos(newList);
        // console.log(response.data.message);
      })
      .catch((err: AxiosError) => {
        console.log('Something went wrong');
        return err;
      });
  };

  const submitEdited = () => {
    axiosPrivate
      .put('/editTodo', {
        data: {
          editId,
          editName,
        },
      })
      .then(() => {
        const index = data.todos.findIndex((item) => item._id === editId);
        const newList = data.todos.slice();
        newList[index].name = editName;
        data.setTodos(newList);
        closeEditModal();
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  const getTodoIndex = (id: string) => {
    return data.todos.findIndex((item) => item._id === id);
  };

  const toggleCompleted = (id: string, completed: boolean) => {
    axiosPrivate
      .put('/toggleCompleted', { data: { todoId: id, completed } })
      .then(() => {
        const index = getTodoIndex(id);
        const newList = data.todos.slice();
        newList[index].completed = completed;
        data.setTodos(newList);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  const createListItem = (todo: Todo, index: number) => {
    return (
      <ListGroup.Item
        id={`${todo._id}`}
        key={index}
        variant='secondary'
        onClick={(e: React.MouseEvent) => {
          const target = e.currentTarget as Element;

          // const clicked = e.currentTarget;
          // clicked?.classList.add('active');
          setClickedElement(target);
          setTodoId(todo._id);
        }}
        onLoad={() => {
          console.log('hello');
        }}
        onBlur={(e) => {
          setTodoId(null);
          const clicked = e.currentTarget;
          const closeButton = clicked?.querySelector('p');
          // clicked.classList.remove('active');
          if (closeButton) {
            closeButton.remove();
          }
          setClickedElement(clicked);
        }}
        //onBlur will remove the highlight and the close button.
        action
        className='listItem'
      >
        <div
          className='todoName'
          onClick={() => {
            setEditName(todo.name);
            setEditId(todo._id);
            setShowEditModal(true);
            setEditCompleted(todo.completed);
          }}
        >
          {todo.name}
        </div>

        {todo._id === todoId ? (
          <div>
            {todo.completed ? (
              <OverlayTrigger
                placement='top'
                overlay={<Tooltip>Mark Incomplete</Tooltip>}
              >
                <FontAwesomeIcon
                  style={{ marginRight: '10px', color: 'red' }}
                  icon={faSquareXmark}
                  size='sm'
                  onClick={() => {
                    if (clickedElement) {
                      clickedElement.classList.remove('active');
                    }

                    toggleCompleted(todo._id, !todo.completed);
                  }}
                />
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement='top'
                overlay={<Tooltip>Mark Complete</Tooltip>}
              >
                <FontAwesomeIcon
                  style={{ marginRight: '10px', color: 'green' }}
                  icon={faCheck}
                  size='sm'
                  onClick={() => {
                    clickedElement?.classList.remove('active');

                    toggleCompleted(todo._id, !todo.completed);
                  }}
                />
              </OverlayTrigger>
            )}

            <FontAwesomeIcon
              icon={faTrash}
              size='sm'
              onClick={(e) => {
                const clickedElement = e.currentTarget;
                const todoElement: any = clickedElement.closest('button');
                todoElement?.classList.remove('active');
                todoElement?.blur();
                deleteTodo(todo._id);
              }}
            />
          </div>
        ) : null}
      </ListGroup.Item>
    );
  };

  useEffect(() => {
    const complete: Array<Todo> = [];
    const incomplete: Array<Todo> = [];

    data.todos.forEach((todo) => {
      if (todo.list_id === listId) {
        if (todo.completed) {
          complete.push(todo);
        } else {
          incomplete.push(todo);
        }
      }
    });
    setCompleteTodos(complete);
    setIncompleteTodos(incomplete);
    /*
      set state of completeTodos and incompleteTodos each time listId is updated. 
      iterate over all todos and filter out only ones that have the same listId. 
      create an array for complete and incomplete
      iterate over each todo using forEach
        -> if todo has the same listId and depending on the complete status
          -> push to complete or incomplete array. 
      set state of each complete and incomplete. 

    */
  }, [listId, data.todos]);

  useEffect(() => {
    if (todoName.length > 0) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [todoName]);

  useEffect(() => {
    if (editId.length > 0) {
      const index = data.todos.findIndex((item) => item._id === editId);
      setEditSubmitDisabled(data.todos[index].name === editName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editName]);

  /* 
  Todos Component is loaded in TodoListMain when a todoId is set for the first time.
   editName is set to ''. The useEffect above will run when a todoList is selected.

   editId is as an empty string when component is loaded. 
   It is updated when user clicks to edit a todo. 
   The submit button on the edit todo modal is made available once 
   the text is different from what was saved previously.

  */

  const submitTodo = () => {
    createTodo(todoName);
  };

  const debounceCreateTodo = useCallback(debounce(submitTodo, 300), [
    submitTodo,
  ]);

  return (
    <div>
      {/* create new todo Modal */}

      <Modal show={showTodoModal} onHide={closeTodoModal}>
        <Modal.Header closeButton></Modal.Header>
        {todoSubmitted ? (
          <Modal.Body>Todolist was created.</Modal.Body>
        ) : (
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitDisabled(true);
                closeTodoModal();
                debounceCreateTodo();
                setTodoSubmitted(false);
                console.log('submit');
              }}
            >
              <Form.Group className='mb-3' controlId='formTodoListName'>
                <Form.Label>What is the name of this todo?</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setTodoName(e.currentTarget.value);
                  }}
                  type='text'
                  placeholder='Todo list name'
                />
              </Form.Group>
              <Button disabled={submitDisabled} variant='primary' type='submit'>
                Submit
              </Button>
              {todoError ? (
                <Form.Text className='text-danger'>
                  {' '}
                  Something went wrong. Try again.
                </Form.Text>
              ) : null}
            </Form>
          </Modal.Body>
        )}
      </Modal>

      {/* edit todo Modal */}

      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitEdited();
            }}
          >
            <Form.Label>Edit name of todo</Form.Label>
            <Form.Control
              onChange={(e) => {
                setEditName(e.target.value.trim().trimEnd());

                // Spaces at the end an the middle will be removed before state is set.
              }}
              type='text'
              defaultValue={editName}
            ></Form.Control>
            <div id='edit-buttons'>
              <div id='cancel-save'>
                <Button
                  id='edit-cancel-button'
                  onClick={() => {
                    closeEditModal();
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={editSubmitDisabled} type='submit'>
                  Save
                </Button>
              </div>
              <div>
                {editCompleted ? (
                  <Button
                    onClick={() => {
                      toggleCompleted(editId, !editCompleted);
                      closeEditModal();
                    }}
                  >
                    Mark as Incomplete
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      toggleCompleted(editId, !editCompleted);
                      closeEditModal();
                    }}
                  >
                    Mark as Complete
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {data.todos.length > 0 ? (
        <div>
          {incompleteTodos.length > 0 ? (
            <div>
              Incomplete
              <br />
              <div id='todos-box'>
                {incompleteTodos.map((todo: Todo, i) => {
                  console.log(todo);
                  return createListItem(todo, i);
                })}
              </div>
            </div>
          ) : null}
          {completeTodos.length > 0 ? (
            <div>
              Completed
              <br />
              <div id='todos-box'>
                {completeTodos.map((todo: Todo, i) => {
                  /*
                  input: array of objects
                  output/sideffect: return a call to 
                  createListItem with an object that has 
                  items specific to the Todo interface as 
                  first argument and i as a second argument. 

                  edge cases: 
                    -input array is empty.
                    - object does not have specific item

                  plan
                    - iterate over array of todos with map
                    - at each todo object 
                      -> create an object 
                      -> assign wanted elements to new objects
                      * concern
                        -> does assigning a key value pair from another 
                        object create a copy or a reference? 
                

                  */

                  return createListItem(todo, i);
                })}
              </div>
            </div>
          ) : null}
          <Button
            onClick={() => {
              setShowTodoModal(true);
            }}
          >
            Create new Todo
          </Button>
        </div>
      ) : (
        <Button
          id='empty-new-todo-button'
          onClick={() => {
            setShowTodoModal(true);
          }}
        >
          Create New Todo
        </Button>
      )}
    </div>
  );
};

export default Todos;
