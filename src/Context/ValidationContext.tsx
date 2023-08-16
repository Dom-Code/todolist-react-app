import React, { createContext } from 'react';

export interface IList {
  name: string;
  createAt: string;
  todos: Array<any>;
  user_id: string;
  __v: number;
  _id: string;
  updatedAt: string | null;
}

interface iValidation {
  accessToken: String;
  setAccessToken: React.Dispatch<React.SetStateAction<String>>;
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  lists: Array<any>;
  setLists: React.Dispatch<React.SetStateAction<Array<IList>>>;
  todos: Array<any>;
  setTodos: React.Dispatch<React.SetStateAction<Array<any>>>;
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
