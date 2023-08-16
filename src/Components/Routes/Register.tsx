import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import '../style/Register.css';
import axios from 'axios';
// import { RegisterFormProps } from './Account';
import { useNavigate } from 'react-router-dom';

import { Formik, validateYupSchema } from 'formik';
import { object, string, array, InferType } from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
    setTimeout(() => {
      handleCloseModal();
      navigate('/account/login');
    }, 3000);
  };
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [email, setEmail] = useState<null | string>(null);
  const [name, setName] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const emailRegex =
    /^[a-z0-9][-a-z0-9.!#$%&'*+-=?^_`{|}~/]+@([-a-z0-9]+\.)+[a-z]{2,5}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/;

  const nameRegex = /^[a-zA-Z]{2,}$/;
  const schema = object().shape({
    email: string().required().matches(emailRegex),
    name: string().required().min(2).matches(nameRegex),
    password: string().required().min(8).max(16).matches(passwordRegex),
  });

  const submitForm = () => {
    const registerData = {
      email,
      name,
      password,
    };

    axios({
      method: 'post',
      url: 'http://localhost:5000/api/register',
      data: registerData,
    })
      .then((response) => {
        console.log(response.status);
        handleShowModal();
      })
      .catch((err) => {
        if (err.response.status === 422) {
          console.log('Invalid Entry');
        }
        console.log(err.response.status);
      });
  };

  // useEffect(() => {
  //   if (email !== null && name !== null && password !== null) {
  //     setSubmitButtonDisabled(false);
  //   }
  //   if (email) {
  //     setUserEmail(email);
  //   } else {
  //     setUserEmail('');
  //   }
  // }, [email, name, password, setUserEmail]);

  return (
    <div id='register'>
      <Formik
        validationSchema={schema}
        initialValues={{
          email: '',
          name: '',
          password: '',
        }}
        onSubmit={() => {}}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            <Row className='row mb-4'>
              <Form.Group as={Col} controlId='validationFormik01'>
                <InputGroup hasValidation>
                  <Form.Label className='label'>Email Address:</Form.Label>
                  <Form.Control
                    type='text'
                    name='email'
                    value={values.email}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value.match(emailRegex)) {
                        setEmail(e.target.value);
                      } else {
                        setEmail(null);
                      }
                    }}
                    isValid={!!values.email && !errors.email}
                    isInvalid={!!errors.email}
                    className='rounded-3'
                  />

                  <Form.Control.Feedback className='feedback'>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid' className='feedback'>
                    Incorrect Format
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className='row mb-4'>
              <Form.Group as={Col} controlId='validationFormik02'>
                <InputGroup hasValidation>
                  <Form.Label className='label'>Name:</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    value={values.name}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value.match(nameRegex)) {
                        setName(e.target.value);
                      } else {
                        setName(null);
                      }
                    }}
                    isValid={!!values.name && !errors.name}
                    isInvalid={!!errors.name}
                    className='rounded-3'
                  />

                  <Form.Control.Feedback className='feedback'>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback
                    type='invalid'
                    className='feedback'
                    // tooltip
                  >
                    Name must contain at least 2 letters.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className='row mb-4'>
              <Form.Group as={Col} controlId='validationFormik03'>
                <InputGroup hasValidation>
                  <Form.Label className='label'>Password:</Form.Label>
                  <Form.Control
                    type='text'
                    name='password'
                    value={values.password}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value.match(passwordRegex)) {
                        setPassword(e.target.value);
                      } else {
                        setPassword(null);
                      }
                    }}
                    isValid={!!values.password && !errors.password}
                    isInvalid={!!errors.password}
                    className='rounded-3'
                  />
                  <Form.Control.Feedback className='feedback'>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback
                    className='feedback'
                    type='invalid'
                    // tooltip
                  >
                    Password must have 8-16 characters with at least 1 uppercase
                    letter, 1 number, and 1 special character{' '}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Button
              id='submit-button'
              disabled={submitButtonDisabled}
              type='submit'
            >
              Submit form
            </Button>
          </Form>
        )}
      </Formik>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Body>
          <h3 id='modal-success'>User Created</h3>You will be redirected
          shortly...
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Register;
