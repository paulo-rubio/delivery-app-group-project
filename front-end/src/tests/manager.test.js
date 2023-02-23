import React from 'react';
import {
  waitFor,
  screen,
  act,
} from '@testing-library/react';
import renderWithRouterAndRedux from './utils/renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';
import axios from 'axios';

const managerLoginResponse = {
  data: {
    message: 'success',
    response: {
      name: 'manager',
      email: 'adm@hotmail.com',
      role: 'administrator',
      id: 1,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWQiOjUsImlhdCI6MTY3NzE3OTM2OSwiZXhwIjoxNjc4OTA3MzY5fQ.8P0-EU-PEuUWjDCJruol77GQVNtvqLz8VIfl2EWgIvk',
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '353',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    port: 3001,
    method: 'post',
    url: 'http://localhost:3001/login',
    data: '{"email":"cliente@hotmail.com","password":"1234567Bb"}',
  },
  request: {},
};

const managerFetchUsersMock = {
  data: [
    {
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: 'a4c86edecc5aee06eff8fdeda69e0d04',
      role: 'administrator',
    },
    {
      id: 2,
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      password: '3c28d2b0881bf46457a853e0b07531c6',
      role: 'seller',
    },
    {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
      role: 'customer',
    },
    {
      id: 4,
      name: 'Dona Tereza',
      email: 'adm@hotmail.com',
      password: '994242de3894f53ac7bc9d6c56364b2a',
      role: 'administrator',
    },
    {
      id: 5,
      name: 'Cliente zika',
      email: 'cliente@hotmail.com',
      password: '0dced281d75c3f1d2352bb28454ebc46',
      role: 'customer',
    },
    {
      id: 6,
      name: 'Vendedor zika',
      email: 'vendedor@hotmail.com',
      password: 'fee8bc8bb31d184765fa7f7886257cfb',
      role: 'seller',
    },
    {
      id: 7,
      name: 'Thiago Barbosa',
      email: 'tryber@test.com',
      password: '25d55ad283aa400af464c76d713c07ad',
      role: 'customer',
    },
    {
      id: 8,
      name: 'tryber@teste.com',
      email: 'tryber@teste.com',
      password: '4675ee57486c6ab9507d64d763ffd4f3',
      role: 'customer',
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '1019',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG9uYSBUZXJlemEiLCJlbWFpbCI6ImFkbUBob3RtYWlsLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWQiOjQsImlhdCI6MTY3NzE4MDI0NSwiZXhwIjoxNjc4OTA4MjQ1fQ.HCLT_no5k2SCfJfRnYSxRS_xr5IxQxtnIIKxWEJVpeE',
    },
    method: 'get',
    url: 'http://localhost:3001/users',
  },
  request: {},
};

const updatedUsersMock = {
  data: [
    {
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: 'a4c86edecc5aee06eff8fdeda69e0d04',
      role: 'administrator',
    },
    {
      id: 2,
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      password: '3c28d2b0881bf46457a853e0b07531c6',
      role: 'seller',
    },
    {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
      role: 'customer',
    },
    {
      id: 4,
      name: 'Dona Tereza',
      email: 'adm@hotmail.com',
      password: '994242de3894f53ac7bc9d6c56364b2a',
      role: 'administrator',
    },
    {
      id: 5,
      name: 'Cliente zika',
      email: 'cliente@hotmail.com',
      password: '0dced281d75c3f1d2352bb28454ebc46',
      role: 'customer',
    },
    {
      id: 6,
      name: 'Vendedor zika',
      email: 'vendedor@hotmail.com',
      password: 'fee8bc8bb31d184765fa7f7886257cfb',
      role: 'seller',
    },
    {
      id: 7,
      name: 'Thiago Barbosa',
      email: 'tryber@test.com',
      password: '25d55ad283aa400af464c76d713c07ad',
      role: 'customer',
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '1019',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG9uYSBUZXJlemEiLCJlbWFpbCI6ImFkbUBob3RtYWlsLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWQiOjQsImlhdCI6MTY3NzE4MDI0NSwiZXhwIjoxNjc4OTA4MjQ1fQ.HCLT_no5k2SCfJfRnYSxRS_xr5IxQxtnIIKxWEJVpeE',
    },
    method: 'get',
    url: 'http://localhost:3001/users',
  },
  request: {},
};

const deleteResponse = {
  data: [
    {
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: 'a4c86edecc5aee06eff8fdeda69e0d04',
      role: 'administrator',
    },
    {
      id: 2,
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      password: '3c28d2b0881bf46457a853e0b07531c6',
      role: 'seller',
    },
    {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
      role: 'customer',
    },
    {
      id: 4,
      name: 'Dona Tereza',
      email: 'adm@hotmail.com',
      password: '994242de3894f53ac7bc9d6c56364b2a',
      role: 'administrator',
    },
    {
      id: 5,
      name: 'Cliente zika',
      email: 'cliente@hotmail.com',
      password: '0dced281d75c3f1d2352bb28454ebc46',
      role: 'customer',
    },
    {
      id: 6,
      name: 'Vendedor zika',
      email: 'vendedor@hotmail.com',
      password: 'fee8bc8bb31d184765fa7f7886257cfb',
      role: 'seller',
    },
    {
      id: 7,
      name: 'Thiago Barbosa',
      email: 'tryber@test.com',
      password: '25d55ad283aa400af464c76d713c07ad',
      role: 'customer',
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '893',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG9uYSBUZXJlemEiLCJlbWFpbCI6ImFkbUBob3RtYWlsLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWQiOjQsImlhdCI6MTY3NzE4MDI0NSwiZXhwIjoxNjc4OTA4MjQ1fQ.HCLT_no5k2SCfJfRnYSxRS_xr5IxQxtnIIKxWEJVpeE',
    },
    method: 'get',
    url: 'http://localhost:3001/users',
  },
  request: {},
};

it('manager flux should work correctly', async () => {
  jest.spyOn(axios, 'post').mockResolvedValueOnce(managerLoginResponse);
  jest
    .spyOn(axios, 'request')
    .mockResolvedValueOnce(managerFetchUsersMock)
    .mockResolvedValueOnce(updatedUsersMock);
  jest.spyOn(axios, 'delete').mockResolvedValueOnce(deleteResponse);
  renderWithRouterAndRedux(<App />);

  const emailInput = screen.getByTestId('common_login__input-email');
  const clientEmail = 'adm@hotmail.com';
  userEvent.type(emailInput, clientEmail);
  expect(emailInput).toHaveValue(clientEmail);

  const passwordInput = screen.getByTestId('common_login__input-password');
  const clientPassword = '1234567Aa';
  userEvent.type(passwordInput, clientPassword);
  expect(passwordInput).toHaveValue(clientPassword);

  const submitButton = screen.getByRole('button', {
    name: /login/i,
  });

  await waitFor(() => expect(submitButton).toBeEnabled());

  await act(async () => userEvent.click(submitButton));

  //cadastra novo usuário
  const newUser = {
    name: 'Fulano de Tal',
    email: 'fulano@de.tal',
    password: '12345678',
    role: 'customer',
  };

  const getRegisterNewUserButton = () =>
    screen.getByRole('button', { name: /cadastrar/i });

  expect(getRegisterNewUserButton()).toBeDisabled();

  const nameManagerInput = screen.getByTestId('admin_manage__input-name');
  expect(nameManagerInput).toBeInTheDocument();
  userEvent.type(nameManagerInput, newUser.name);
  expect(nameManagerInput).toHaveValue(newUser.name);

  const emailManagerInput = screen.getByTestId('admin_manage__input-email');
  expect(emailManagerInput).toBeInTheDocument();
  userEvent.type(emailManagerInput, newUser.email);
  expect(emailManagerInput).toHaveValue(newUser.email);

  const passwordManagerInput = screen.getByTestId(
    'admin_manage__input-password',
  );
  expect(passwordManagerInput).toBeInTheDocument();
  userEvent.type(passwordManagerInput, newUser.password);
  expect(passwordManagerInput).toHaveValue(newUser.password);

  const roleManagerSelect = screen.getByTestId('admin_manage__select-role');
  expect(roleManagerSelect).toBeInTheDocument();
  userEvent.selectOptions(roleManagerSelect, newUser.role);
  expect(roleManagerSelect).toHaveValue(newUser.role);

  await waitFor(async () => expect(getRegisterNewUserButton()).toBeEnabled());

  await act(async () => userEvent.click(getRegisterNewUserButton()));

  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(9);

  const removeButton = screen.getByTestId('admin_manage__element-user-table-remove-7');
  expect(removeButton).toBeInTheDocument();

  await act(async () => userEvent.click(removeButton));

  const updatedRows = screen.getAllByRole('row');
  expect(updatedRows).toHaveLength(8);
});
