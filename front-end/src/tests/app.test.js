import React from 'react';
import { waitFor, act, fireEvent, screen } from '@testing-library/react';
import * as axios from 'axios';
// import isBadRequest from './utils/request';
import renderWithRouterAndRedux from './utils/renderWithRouter';
import App from '../App';
// import Login from '../pages/Login/Login';

afterEach(() => {
  jest.resetAllMocks();
});
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRl
const emailInputID = 'common_login__input-email';
const SenhaInputID = 'common_login__input-password';
const buttonLoginID = 'common_login__button-login';
const adm = 'adm@hotmail.com';
const vendedor = 'vendedor@hotmail.com';
const cliente = 'cliente@hotmail.com';
const testClient = {
  email: cliente,
  name: 'ClienteZika',
  role: 'customer',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRl',
};

const testADM = {
  email: adm,
  name: 'Dona Tereza',
  role: '"administrator"',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG9uYSBUZXJlemEiLCJlbWFpbCI6ImFkbUBob3RtYWlsLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MTA4NDIyLCJleHAiOjE2NzY4MzY0MjJ9.lMsudH4YnXVBo81taYf8RzrH9nUKh21VCeZvtXzPaZU',
};

const testSeller = {
  email: vendedor,
  name: 'Vendedor zika',
  role: 'seller',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmVuZGVkb3IgemlrYSIsImVtYWlsIjoidmVuZGVkb3JAaG90bWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjc1MTA5NDE2LCJleHAiOjE2NzY4Mzc0MTZ9.j42JBCP34COq4yh-aRfu1FotCnKRYob8M_kx8obP8hk',
};

const mockRegister = {
  data: {
    response: {
      email: 'emailinvalido@gmail.com',
      role: 'customer',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwibmFtZSI6IlBhdWxvIFJ1YmlvIFRlc3QiLCJlbWFpbCI6InRyeWJlckB0ZXN0ZS5jb20iLCJwYXNzd29yZCI6ImY1YmIwYzhkZTE0NmM2N2I0NGJhYmJmNGU2NTg0Y2MwIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjc1MTg4MTA5LCJleHAiOjE2NzY5MTYxMDl9.fwL6J2jBDimRoaD7dEmPZbvasW_4eHiRO7-yE7LfR2s',
    },
  },
  status: 404,
};

describe.only('Testes na Pagina Inicial de Login', () => {
  afterEach(() => {
    localStorage.clear();
  });
  test('test in customer', async () => {
    const mockOnSubmit = jest.fn();
    jest.spyOn(axios, 'post').mockResolvedValue(testClient);
    const { getByTestId, history } = renderWithRouterAndRedux(
      <App onSubmit={ mockOnSubmit() } />,
    );

    await act(async () => {
      fireEvent.change(
        getByTestId(emailInputID),
        { target: { value: testClient.email } },
      );
      fireEvent.change(
        getByTestId(SenhaInputID),
        { target: { value: '1234567Bb' } },
      );
    });

    await act(async () => {
      fireEvent.click(
        getByTestId('common_login__button-login'),
      );
    });
    expect(mockOnSubmit).toHaveBeenCalled();

    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/products');
    });
  });
  test('testing in role adm', async () => {
    const mockOnSubmit = jest.fn();
    jest.spyOn(axios, 'post').mockResolvedValue(testADM);
    const { getByTestId, history } = renderWithRouterAndRedux(
      <App onSubmit={ mockOnSubmit() } />,
    );

    await act(async () => {
      fireEvent.change(
        getByTestId(emailInputID),
        { target: { value: testADM.email } },
      );
      fireEvent.change(
        getByTestId(SenhaInputID),
        { target: { value: '1234567Aa' } },
      );
    });

    await act(async () => {
      fireEvent.click(
        getByTestId(buttonLoginID),
      );
    });
    expect(mockOnSubmit).toHaveBeenCalled();

    await waitFor(() => {
      expect(history.location.pathname).toBe('/admin/manage');
    });
  });
  test('in role seller', async () => {
    const mockOnSubmit = jest.fn();
    jest.spyOn(axios, 'post').mockResolvedValue(testSeller);
    const { getByTestId, history, getByRole } = renderWithRouterAndRedux(
      <App onSubmit={ mockOnSubmit() } />,
    );

    await act(async () => {
      fireEvent.change(
        getByTestId(emailInputID),
        { target: { value: testSeller.email } },
      );
      fireEvent.change(
        getByTestId(SenhaInputID),
        { target: { value: '1234567Cb' } },
      );
    });

    await act(async () => {
      fireEvent.click(
        getByRole('button', { name: /LOGIN/i }),
      );
    });
    expect(mockOnSubmit).toHaveBeenCalled();

    await waitFor(() => {
      expect(history.location.pathname).toBe('/seller/orders');
    });
  });
  test('in the invalid email', async () => {
    const { container, getByTestId } = renderWithRouterAndRedux(<App />);
    await act(async () => {
      fireEvent.change(getByTestId(
        emailInputID,
        { target: { value: 'email invalido' } },
      ));
      fireEvent.blur(getByTestId(emailInputID));
    });
    expect(container.innerHTML).toMatch('Email must be valid');
  });
  test('in the invalid passowrd', async () => {
    const { container, getByTestId } = renderWithRouterAndRedux(<App />);
    await act(async () => {
      fireEvent.change(getByTestId(
        SenhaInputID,
        { target: { value: '123' } },
      ));
      fireEvent.blur(getByTestId(SenhaInputID));
    });
    expect(container.innerHTML)
      .toMatch('Password minimum length is at least six characters long');
  });
  test('click in register for redirect to /register', async () => {
    const { history, getByRole } = renderWithRouterAndRedux(<App />);
    await act(async () => {
      fireEvent.click(
        getByRole('button', { name: /SIGN UP/i }),
      );
      expect(history.location.pathname).toBe('/register');
    });
  });
  test('testing in error', async () => {
    jest.spyOn(axios, 'post').mockRejectedValue(mockRegister);
    const { getByTestId, getByRole } = renderWithRouterAndRedux(<App />);
    const invalidMessage = 'Request failed with status code 404';
    await act(async () => {
      fireEvent.change(
        getByTestId(emailInputID),
        { target: { value: 'test@test.test' } },
      );
      fireEvent.change(
        getByTestId(SenhaInputID),
        { target: { value: '1234567Cb' } },
      );
    });
    fireEvent.click(
      getByRole('button', { name: /LOGIN/i }),
    );
    const invalid = await screen.findByText(invalidMessage);
    expect(invalid).toBeInTheDocument();
  });
});
