import { waitFor, act, fireEvent, getAllByText } from '@testing-library/react';
import * as axios from 'axios';
import App from '../App';
import renderWithRouterAndRedux from './utils/renderWithRouter';

const order = {
  data: [{
    deliveryAddress: 'Rua Irmãos Monteiro, Bairo Pedras',
    deliveryNumber: '123',
    id: 1,
    products: {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    },
    sale: {
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
  }],
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
const id = `${testClient.role}_orders__element-order-id-${order.data[0].id}`;
const status = `${testClient.role}_orders__element-delivery-status-${order.data[0].id}`;
const date = `${testClient.role}_orders__element-order-date-${order.data[0].id}`;
const totalPrice = `${testClient.role}_orders__element-card-price-${order.data[0].id}`;
const address = `${testSeller.role}_orders__element-card-address-${order.data[0].id}`;

jest.mock('axios');
describe('testing in customer orders', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      stringfiedData,
    );
  });
  test('testing in customer', async () => {
    axios.request.mockResolvedValue(order);
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);
    await act(async () => { history.push(`/${testClient.role}/orders`); });
    console.log(id);
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
    axios.request.mockResolvedValue(order);
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);

    await act(async () => { history.push(`/${testSeller.role}/orders`); });

    const getaddress = getByTestId(address);
    expect(getaddress).toBeDefined();
  });
  // test('testing in custumer orders ', async () => {
  //   axios.request.mockResolvedValue(order);
  //   const { getByTestId, history, getAllByRole } = renderWithRouterAndRedux(<App />);

  //   await act(async () => { history.push(`/customer/orders/${order.data[0].id}`); });

  //   const getNumber = getByTestId(tablenumber);
  //   const getname = getByTestId(tablename);
  //   const getqnt = getByTestId(tableqnt);
  //   const getPrice = getByTestId(tableprice);
  //   const getTotalPrice = getByTestId(tabletotal);

  //   expect(getNumber).toBeDefined();
  //   expect(getname).toBeDefined();
  //   expect(getqnt).toBeDefined();
  //   expect(getPrice).toBeDefined();
  //   expect(getTotalPrice).toBeDefined();
  // });
});
