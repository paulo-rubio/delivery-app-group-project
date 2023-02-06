import { waitFor, act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
const buttonPreparando = 'seller_order_details__button-preparing-check';
const buttonEmTransito = 'seller_order_details__button-dispatch-check';
// const EmTransito = 'seller_order_details__element-order-details-label-delivery-status';

const testSeller = {
  name: 'Vendedor zika',
  email: 'vendedor@hotmail.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmVuZGVkb3IgemlrYSIsImVtYWlsIjoidmVuZGVkb3JAaG90bWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjc1NDM4NjIyLCJleHAiOjE2NzcxNjY2MjJ9.o4i_98YbTn-w1wcHFZzcgshHoS3y2FiMtMmqOXx0fUs',
  role: 'seller',
};
const stringfiedData = JSON.stringify(testSeller);
const rote = `/seller/orders/${order.data[0].id}`;

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

    const status = await screen.findByText('Pendente');

    // const { findByTestId } = page;
    const preparando = await screen.findByTestId(buttonPreparando);
    const entregue = await screen.findByTestId(buttonEmTransito);
    expect(status).toBeDefined();
    act(() => { userEvent.click(preparando); });

    act(() => { fireEvent.click(entregue); });
  });
});
