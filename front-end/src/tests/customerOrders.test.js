import { waitFor, act, fireEvent, getAllByText } from '@testing-library/react';
import * as axios from 'axios';
import App from '../App';
import renderWithRouterAndRedux from './utils/renderWithRouter';

const product = {
  data: [{ id: 1,
    status: 'Pendente',
    saleDate: '01/02/2023',
    totalPrice: '22.81',
    deliveryAddress: 'Rua Irmãos Monteiro, Bairo Pedras' }],
};

const testClient = {
  name: 'Cliente zika',
  email: 'cliente@hotmail.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjc1NDM3OTYwLCJleHAiOjE2NzcxNjU5NjB9.BEjzLfadBy_yRyMkSubO7-vwYB0nePJorJjrGQxOJ8k',
  role: 'customer',
};

const testSeller = {
  name: 'Vendedor zika',
  email: 'vendedor@hotmail.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmVuZGVkb3IgemlrYSIsImVtYWlsIjoidmVuZGVkb3JAaG90bWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjc1NDM4NjIyLCJleHAiOjE2NzcxNjY2MjJ9.o4i_98YbTn-w1wcHFZzcgshHoS3y2FiMtMmqOXx0fUs',
  role: 'seller',
};

const stringfiedData = JSON.stringify(testClient);
const id = `${testClient.role}_orders__element-order-id-${product.data[0].id}`;
const status = `${testClient.role}_orders__element-delivery-status-${product.data[0].id}`;
const date = `${testClient.role}_orders__element-order-date-${product.data[0].id}`;
const totalPrice = `${testClient.role}_orders__element-card-price-${product.data[0].id}`;
const address = `${testSeller.role}_orders__element-card-address-${product.data[0].id}`;

jest.mock('axios');
describe('testing in customer orders', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      stringfiedData,
    );
  });
  test('testing in customer', async () => {
    axios.request.mockResolvedValue(product);
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);
    await act(async () => { history.push(`/${testClient.role}/orders`); });

    const getID = getByTestId(id);
    const getStatus = getByTestId(status);
    const getDate = getByTestId(date);
    const getPrice = getByTestId(totalPrice);

    expect(getID).toBeDefined();
    expect(getStatus).toBeDefined();
    expect(getDate).toBeDefined();
    expect(getPrice).toBeDefined();
  });
  test('testing in custumer orders ', async () => {
    axios.request.mockResolvedValue(product);
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);

    await act(async () => { history.push(`/${testSeller.role}/orders`); });

    const getaddress = getByTestId(address);
    expect(getaddress).toBeDefined();
  });
});
