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

// const testSeller = {
//   name: 'Vendedor zika',
//   email: 'vendedor@hotmail.com',
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmVuZGVkb3IgemlrYSIsImVtYWlsIjoidmVuZGVkb3JAaG90bWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjc1NDM4NjIyLCJleHAiOjE2NzcxNjY2MjJ9.o4i_98YbTn-w1wcHFZzcgshHoS3y2FiMtMmqOXx0fUs',
//   role: 'seller',
// };
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
    axios.request.mockResolvedValue(order.data[0].products[0]);
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);
    await act(async () => { history.push(rote); });

    const getNumber = getByTestId(tablenumber);
    expect(getNumber).toBe();
  });
});

// problema que não consigo testar os locais que tem tabelas.
// problemas com data-test
