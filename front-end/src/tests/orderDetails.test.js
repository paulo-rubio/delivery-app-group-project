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

const rote = '/admin/manage';

jest.mock('axios');
describe('testing in admManager', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      stringfiedData,
    );
  });
  test('testing in inputs', () => {
  });
});
