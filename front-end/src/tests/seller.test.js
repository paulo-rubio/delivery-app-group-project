import React from 'react';
import { waitFor, screen, act } from '@testing-library/react';
import renderWithRouterAndRedux from './utils/renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';
import axios from 'axios';

const sellerLoginResponse = {
  data: {
    message: 'success',
    response: {
      name: 'seller',
      email: 'vendedor@hotmail.com',
      role: 'seller',
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

const sellerFetchOrdersMock = {
  data: [
    {
      id: 1,
      userId: 5,
      sellerId: 2,
      totalPrice: '16.89',
      deliveryAddress: 'Loteamento Caribe',
      deliveryNumber: 42,
      saleDate: '2023-02-23T20:07:26.000Z',
      status: 'Pendente',
    },
    {
      id: 2,
      userId: 5,
      sellerId: 6,
      totalPrice: '37.87',
      deliveryAddress: 'Loteamento Caribe',
      deliveryNumber: 42,
      saleDate: '2023-02-23T20:07:43.000Z',
      status: 'Pendente',
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '345',
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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmVuZGVkb3IgemlrYSIsImVtYWlsIjoidmVuZGVkb3JAaG90bWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWQiOjYsImlhdCI6MTY3NzE4Mjk0MiwiZXhwIjoxNjc4OTEwOTQyfQ.vpUrqL4WTCgVcI4wj0MYXw5MliJewatje7bkD-EJZwI',
    },
    method: 'get',
    url: 'http://localhost:3001/checkout',
  },
  request: {},
};

it('manager flux should work correctly', async () => {
  jest.spyOn(axios, 'post').mockResolvedValueOnce(sellerLoginResponse);
  jest.spyOn(axios, 'request').mockResolvedValueOnce(sellerFetchOrdersMock);

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

  screen.debug()
});
