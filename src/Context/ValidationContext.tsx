import { createContext } from 'react';

export interface IList {
  name: string;
  createAt: string;
  todos: Array<object>;
  user_id: string;
  __v: number;
  _id: string;
  updatedAt: string | null;
}

export interface Todo {
  name: string;
  list_id: string | null;
  _id: string;
  completed: boolean;
  data: string | undefined;
  updatedAt: string | undefined;
  _v: number | undefined;
  createAt: string | undefined;
}

interface iValidation {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  lists: Array<IList>;
  setLists: React.Dispatch<React.SetStateAction<Array<IList>>>;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const defaultContext = {
  accessToken: '',
  setAccessToken: () => {},
  isValid: false,
  setIsValid: () => {},
  lists: [],
  setLists: () => {},
  todos: [],
  setTodos: () => {},
};

const ValidationContext = createContext<iValidation>(defaultContext);

export default ValidationContext;
