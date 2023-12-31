import { waitFor, act, fireEvent, getByRole } from '@testing-library/react';
import * as axios from 'axios';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Product from '../components/Product/Product';
// import CustomerProducts from '../pages/CustomerProducts/CustomerProducts';
import renderWithRouterAndRedux from './utils/renderWithRouter';

const products = {
  data: [{ id: 1, name: 'Skol Lata 250ml', price: 2.20, urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg' }],
};

const table = {
  data: [{
    email: 'adm@deliveryapp.com',
    id: 1,
    name: 'Delivery App Admin',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
  }],
};

const testClient = {
  email: 'adm@hotmail.com',
  name: 'Dona Tereza',
  role: 'administrator',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG9uYSBUZXJlemEiLCJlbWFpbCI6ImFkbUBob3RtYWlsLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1Mzc1ODQ5LCJleHAiOjE2NzcxMDM4NDl9.sl3dfhvDs5elRZ3UuUj4TIZuxbLu-V2ZqZs6rsbWlwU',

};

const stringfiedData = JSON.stringify(testClient);
const inputName = 'admin_manage__input-name';
const inputEmail = 'admin_manage__input-email';
const inputPassowrd = 'admin_manage__input-password';
const inputRole = 'admin_manage__select-role';
const buttonRegister = 'admin_manage__button-register';

const rote = '/admin/manage';
// const admItem = `admin_manage__element-user-table-item-number-${table[0].id}`;
// const tableEmailADM = 'admin_manage__element-user-table-email-adm@deliveryapp.com';
// const admRole = 'admin_manage__element-user-table-role-administrator';
// const excluirButton = 'admin_manage__element-user-table-remove-1';

jest.mock('axios');
describe('testing in admManager', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      stringfiedData,
    );
  });
  test('testing in inputs', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push(rote); });

    const name = getByTestId(inputName);
    const email = getByTestId(inputEmail);
    const password = getByTestId(inputPassowrd);
    const input = getByTestId(inputRole);
    const button = getByTestId(buttonRegister);

    expect(name).toBeDefined();
    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(input).toBeDefined();
    expect(button).toBeDefined();
  });
  test('testing in register', async () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push(rote); });

    await act(async () => {
      fireEvent.change(
        getByTestId(inputName),
        { target: { value: 'bonitono@gmail.com' } },
      );
      fireEvent.change(
        getByTestId(inputPassowrd),
        { target: { value: 'çenhaçecreta' } },
      );
      fireEvent.change(
        getByTestId(inputEmail),
        { target: { value: 'emaindobonito@gmail.com' } },
      );
      fireEvent.change(
        getByTestId(inputRole),
        { target: { value: 'seller' } },
      );
    });
    await act(async () => {
      fireEvent.click(
        getByTestId(buttonRegister),
      );
    });
  });
  test('testing in rows', () => {
    axios.request.mockResolvedValue(table);
    const { getAllByRole, history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push(rote); });

    const linhasDasTabelas = getAllByRole('row');
    expect(linhasDasTabelas.length).toBe(1);
  });
  // test('delet user', async () => {
  //   axios.request.mockResolvedValue(testClient);
  //   const { getByTestId, history } = renderWithRouterAndRedux(<App />);
  //   await act(async () => { history.push(rote); });

  //   expect(testClient.data[0].token).toEqual(token);
  //   await act(async () => {
  //     fireEvent.click(
  //       getByTestId(excluirButton),
  //     );
  //   });

  //   expect(testClient.data[0]).toEqual(false);
  // });
});
