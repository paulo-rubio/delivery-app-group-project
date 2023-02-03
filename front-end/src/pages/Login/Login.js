import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import { setLocalStorage } from '../../utils/localStorage';

const STYLE_CLASSNAMES = {
  FORM_VALIDATION: 'form-validation',
  FORM_VALIDATION_SUCCESS: 'form-validation__success',
};
const BACKEND_PORT = 3001;
const SUCCESS = 200;

function Login() {
  const [isError, setIsError] = useState([]);
  const { push } = useHistory();
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    criteriaMode: 'all',
    mode: 'onChange',
  });
  const handleRedirect = (role) => {
    switch (role) {
    case 'administrator':
      return push('/admin/manage');
    case 'seller':
      return push('/seller/orders');
    default:
      return push('/customer/products');
    }
  };
  const onSubmit = async (data) => {
    try {
      const {
        data: { response },
        status,
      } = await axios.post('http://localhost:3001/login', data, {
        port: BACKEND_PORT,
      });
      console.log(response);
      if (status !== SUCCESS) {
        throw new Error(response?.message);
      }
      setLocalStorage('user', response);
      handleRedirect(response.role);
    } catch (error) {
      console.log(errors, 'err');
      const errorMessage = error?.response?.data?.message || error.message;
      setIsError([errorMessage]);
    }
  };

  const { isDirty: isPasswordDirty, error: passwordErrors } = getFieldState('password');
  const { isDirty: isEmailDirty, error: emailErrors } = getFieldState('email');

  return (
    <div className={ styles['login-page'] }>
      <main className={ styles['login-container'] }>
        <form
          onSubmit={ handleSubmit(onSubmit) }
          className={ styles['form-container'] }
        >
          <label htmlFor="email" className={ styles['form-label'] }>
            Email
            <input
              type="email"
              id="email"
              data-testid="common_login__input-email"
              { ...register('email', {
                required: 'Please put an email!',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email!',
                },
              }) }
              autoComplete="off"
            />
            <p
              className={ `${styles[STYLE_CLASSNAMES.FORM_VALIDATION]} ${
                isEmailDirty && !emailErrors?.types?.required
                  ? styles[STYLE_CLASSNAMES.FORM_VALIDATION_SUCCESS]
                  : ''
              }` }
            >
              Enter an email
            </p>
            <p
              className={ `${styles[STYLE_CLASSNAMES.FORM_VALIDATION]} ${
                isEmailDirty && !emailErrors?.types?.pattern
                  ? styles[STYLE_CLASSNAMES.FORM_VALIDATION_SUCCESS]
                  : ''
              }` }
            >
              Email must be valid
            </p>
          </label>
          <label htmlFor="password" className={ styles['form-label'] }>
            Password
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              data-testid="common_login__input-password"
              { ...register('password', {
                required: 'Please put a password!',
                minLength: { value: 6, message: 'Password is too short!' },
                // pattern: {
                //   value: /^(?=.*[A-Z])[A-Za-z\d]*$/,
                //   message: 'Please enter at least one uppercase letter!',
                // },
              }) }
            />
            <p
              className={ `${styles[STYLE_CLASSNAMES.FORM_VALIDATION]} ${
                isPasswordDirty && !passwordErrors?.types?.required
                  ? styles[STYLE_CLASSNAMES.FORM_VALIDATION_SUCCESS]
                  : ''
              }` }
            >
              Enter a password
            </p>
            <p
              className={ `${styles[STYLE_CLASSNAMES.FORM_VALIDATION]} ${
                isPasswordDirty && !passwordErrors?.types?.minLength
                  ? styles[STYLE_CLASSNAMES.FORM_VALIDATION_SUCCESS]
                  : ''
              }` }
            >
              Password minimum length is at least six characters long
            </p>
            {/* <p
              className={ `${styles[STYLE_CLASSNAMES.FORM_VALIDATION]} ${
                isPasswordDirty && !passwordErrors?.types?.pattern
                  ? styles[STYLE_CLASSNAMES.FORM_VALIDATION_SUCCESS]
                  : ''
              }` }
            >
              Password must have at least one uppercase letter
            </p> */}
          </label>
          <button
            type="submit"
            data-testid="common_login__button-login"
            disabled={ !isValid }
          >
            LOGIN
          </button>
          <button
            type="button"
            onClick={ () => push('/register') }
            data-testid="common_login__button-register"
          >
            SIGN UP
          </button>
          {isError
            && isError.map((errorMessage) => (
              <p
                key="errorMessage"
                data-testid="common_login__element-invalid-email"
              >
                {errorMessage}
              </p>
            ))}
        </form>
        <div className={ styles['login-hero'] } />
      </main>
    </div>
  );
}

export default Login;
