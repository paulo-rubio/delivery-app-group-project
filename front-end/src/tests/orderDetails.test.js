import { waitFor, act, fireEvent } from '@testing-library/react';
import * as axios from 'axios';
import App from '../App';
import renderWithRouterAndRedux from './utils/renderWithRouter';

const order = { data: [{
  deliveryAddress: 'Rua Irmãos Monteiro, Bairo Pedras',
  deliveryNumber: '123',
  id: 1,
  products: [{
    SalesProduct: { saleId: 1, productId: 1, quantity: 3 },
    id: 1,
    name: 'Skol Lata 250ml',
    price: 2.20,
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  }],
  seller: {
    email: 'fulana@deliveryapp.com',
    id: 2,
    name: 'Fulana Pereira',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
  status: 'Pendente',
  saleDate: '01/02/2023',
  totalPrice: '22.81',
  sellerId: 2,
}] };

const testClient = {
  name: 'Cliente zika',
  email: 'cliente@hotmail.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjc1NDM3OTYwLCJleHAiOjE2NzcxNjU5NjB9.BEjzLfadBy_yRyMkSubO7-vwYB0nePJorJjrGQxOJ8k',
  role: 'customer',
};

const stringfiedData = JSON.stringify(testClient);

const tablenumber = `${testClient.role}_order_details__element-order-table-item-number-0`;
const tablename = `${testClient.role}_order_details__element-order-table-name-0`;
const tableqnt = `${testClient.role}_order_details__element-order-table-quantity-0`;
const tableprice = `${testClient.role}_order_details__element-order-table-unit-price-0`;
const tabletotal = `${testClient.role}_order_details__element-order-table-sub-total-0`;
const rote = `/customer/orders/${order.data[0].id}`;

jest.mock('axios');
describe('testing in order detail', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      stringfiedData,
    );
  });
  it('is order detail is render', async () => {
    axios.request.mockResolvedValue(order);

    const page = renderWithRouterAndRedux(<App />);
    page.history.push(rote);

    const { findByText } = page;
    const getNumber = findByText('Item');
    const getDescription = findByText('Descrição');
    const getQuantity = findByText('Quantidade');
    const getUnityValue = findByText('Valor Unitário');
    const getTotal = findByText('Sub-total');
    expect(getNumber).toBeDefined();
    expect(getDescription).toBeDefined();
    expect(getQuantity).toBeDefined();
    expect(getUnityValue).toBeDefined();
    expect(getTotal).toBeDefined();
  });
  it('is order table is render', async () => {
    axios.request.mockResolvedValue(order);

    const page = renderWithRouterAndRedux(<App />);
    page.history.push(rote);

    const { findByTestId } = page;
    const getNumber = findByTestId(tablenumber);
    const getName = findByTestId(tablename);
    const getQuantity = findByTestId(tableqnt);
    const getUnityValue = findByTestId(tableprice);
    const getTotal = findByTestId(tabletotal);
    expect(getNumber).toBeDefined();
    expect(getName).toBeDefined();
    expect(getQuantity).toBeDefined();
    expect(getUnityValue).toBeDefined();
    expect(getTotal).toBeDefined();
  });
});

// problema que não consigo testar as tabelas.
// problemas com data-test
