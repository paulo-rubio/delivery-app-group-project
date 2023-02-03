import { act, fireEvent, waitFor } from '@testing-library/react';
import * as axios from 'axios';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Product from '../components/Product/Product';
// import CustomerProducts from '../pages/CustomerProducts/CustomerProducts';
import renderWithRouterAndRedux from './utils/renderWithRouter';

const products = {
  data: [{ id: 1, name: 'Skol Lata 250ml', price: 2.20, quantity: 1, urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg' }],
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

const tableItem = 'customer_checkout__element-order-table-item-number-0';
const tableName = 'customer_checkout__element-order-table-name-0';
const tableQnt = 'customer_checkout__element-order-table-quantity-0';
const tableValueUnit = 'customer_checkout__element-order-table-unit-price-0';
const tabelTotalPrice = 'customer_checkout__element-order-table-sub-total-0';
const remove = 'customer_checkout__element-order-table-remove-0';

const inputAdress = 'customer_checkout__input-address';
const inputAdresnumber = 'customer_checkout__input-address-number';
const inputSeller = 'customer_checkout__select-seller';
const submitOrder = 'customer_checkout__button-submit-order';

const testClient = {
  email: 'cliente@hotmail.com',
  name: 'ClienteZika',
  role: 'customer',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRl',
};

const stringfiedData = JSON.stringify(testClient);

const rote = '/customer/checkout';

jest.mock('axios');
describe('testing in admManager', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      stringfiedData,
    );
  });
  test('testing in inputs', async () => {
    axios.request.mockResolvedValue(products);
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);

    await act(async () => { history.push(rote); });
    const getSeller = getByTestId(inputSeller);
    const address = getByTestId(inputAdress);
    const addressNumber = getByTestId(inputAdresnumber);
    const seller = getByTestId(inputSeller);
    const submit = getByTestId(submitOrder);

    await act(async () => {
      fireEvent.change(
        getByTestId(inputAdresnumber),
        { target: { value: 123 } },
      );
      fireEvent.change(
        getByTestId(inputAdress),
        { target: { value: 'rua dos cravos' } },
      );
      userEvent.type(getSeller, 'Fulana Pereira');
    });
    act(async () => fireEvent.click(submit));

    expect(address).toBeDefined();
    expect(addressNumber).toBeDefined();
    expect(seller).toBeDefined();
    expect(submit).toBeDefined();
  });
  test('in cartProduct', () => {

  });
});
