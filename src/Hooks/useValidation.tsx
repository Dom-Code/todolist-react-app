import { useContext } from 'react';
import ValidationContext from '../Context/ValidationContext';

const useValidation = () => {
  return useContext(ValidationContext);
};

export default useValidation;
