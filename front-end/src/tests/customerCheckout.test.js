import { act, fireEvent, waitFor } from '@testing-library/react';
import * as axios from 'axios';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Product from '../components/Product/Product';
// import CustomerProducts from '../pages/CustomerProducts/CustomerProducts';
import renderWithRouterAndRedux from './utils/renderWithRouter';

const cartProducts = [{
  id: 1,
  name: 'Skol Lata 250ml',
  price: '2.20',
  quantity: 1,
  urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
}];

const seller = { data: [{
  id: 6,
  email: 'vendedor@hotmail.com',
  name: 'Vendedor zika',
  password: 'fee8bc8bb31d184765fa7f7886257cfb',
  role: 'seller',
}] };

// const table = {
//   data: [{
//     email: 'adm@deliveryapp.com',
//     id: 1,
//     name: 'Delivery App Admin',
//     password: 'a4c86edecc5aee06eff8fdeda69e0d04',
//     role: 'administrator',
//   }],
// };

const tableItem = 'customer_checkout__element-order-table-item-number-0';
const tableName = 'customer_checkout__element-order-table-name-0';
const tableQnt = 'customer_checkout__element-order-table-quantity-0';
const tableValueUnit = 'customer_checkout__element-order-table-unit-price-0';
const tabelTotalPrice = 'customer_checkout__element-order-table-sub-total-0';

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
describe('testing in customerCheckout', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      stringfiedData,
    );
  });
  test('testing in inputs', async () => {
    // axios.request.mockResolvedValue(cartProducts);
    const page = renderWithRouterAndRedux(<App />, { cart: { cartProducts } });
    page.history.push(rote);
    const { getByTestId } = page;
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
    await waitFor(() => fireEvent.click(submit));

    expect(address).toBeDefined();
    expect(addressNumber).toBeDefined();
    expect(seller).toBeDefined();
    expect(submit).toBeDefined();
  });
  test('in cartProduct', async () => {
    const page = renderWithRouterAndRedux(<App />, { cart: { cartProducts } });
    page.history.push(rote);
    const { findByTestId } = page;
    const name = await findByTestId(tableName);
    // console.log(name);
    const item = findByTestId(tableItem);
    const qnt = findByTestId(tableQnt);
    const valueUnit = findByTestId(tableValueUnit);
    const totalPrice = findByTestId(tabelTotalPrice);

    expect(name).toBeDefined();
    expect(item).toBeDefined();
    expect(qnt).toBeDefined();
    expect(valueUnit).toBeDefined();
    expect(totalPrice).toBeDefined();
  });
  test('in remove cartProduct', async () => {
    axios.request.mockResolvedValue(seller);

    const page = renderWithRouterAndRedux(<App />, { cart: { cartProducts } });
    page.history.push(rote);
    const { findByRole, findByText } = page;

    const button = await findByRole('button', /Remover/i);
    await waitFor(() => userEvent.click(button));
    const name = await findByText('0,00');

    expect(name).toBeDefined();
  });
  test('', async () => {
    axios.request.mockResolvedValue(seller);
    const page = renderWithRouterAndRedux(<App />, { cart: { cartProducts } });
    page.history.push(rote);
  });
});

// duvidas para segunda:
// estou com muita dificuldade em testar as rotas, talvez seja por eu não ter entendido ainda como funciona os data: e qual dado preciso mocar
// não consigo testar a parte de erro dos registros;
