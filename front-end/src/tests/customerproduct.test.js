import { act, fireEvent } from '@testing-library/react';
import * as axios from 'axios';
import App from '../App';
import Product from '../components/Product/Product';
import CustomerProducts from '../pages/CustomerProducts/CustomerProducts';
import renderWithRouterAndRedux from './utils/renderWithRouter';

const products = {
  data: [{ id: 1, name: 'Skol Lata 250ml', price: 2.20, urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg' }],
};

const testClient = {
  email: 'cliente@hotmail.com',
  name: 'ClienteZika',
  role: 'customer',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRl',
};
const stringfiedData = JSON.stringify(testClient);
const skolLataAddId = `customer_products__button-card-add-item-${products.data[0].id}`;
// const skolLataMinusId = `customer_products__button-card-rm-item-${products.data[0].id}`;
const skilLataQuantityId = `customer_products__input-card-quantity-${products.data[0].id}`;

jest.mock('axios');
describe('testing in products', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      stringfiedData,
    );
  });
  test('testing in prodcuts', async () => {
    axios.request.mockResolvedValue(products);
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);
    await act(async () => { history.push('/customer/products'); });

    await act(async () => {
      fireEvent.click(
        getByTestId(skolLataAddId),
      );
    });
    expect(skilLataQuantityId).toMatch('1');
  });
});
