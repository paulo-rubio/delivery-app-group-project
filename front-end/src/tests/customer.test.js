import React from 'react';
import { waitFor, screen, act, within, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './utils/renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';
import axios from 'axios';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import OrderDetail from '../pages/OrderDetail/OrderDetail';

const consumerLoginResponse = {
  data: {
    message: 'success',
    response: {
      name: 'Cliente zika',
      email: 'cliente@hotmail.com',
      role: 'customer',
      id: 5,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWQiOjUsImlhdCI6MTY3NzE3OTM2OSwiZXhwIjoxNjc4OTA3MzY5fQ.8P0-EU-PEuUWjDCJruol77GQVNtvqLz8VIfl2EWgIvk',
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '353',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    port: 3001,
    method: 'post',
    url: 'http://localhost:3001/login',
    data: '{"email":"cliente@hotmail.com","password":"1234567Bb"}',
  },
  request: {},
};

const fetchProductsMock = {
  data: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
    },
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      price: '2.49',
      urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
    },
    {
      id: 4,
      name: 'Brahma 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
    },
    {
      id: 5,
      name: 'Skol 269ml',
      price: '2.19',
      urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
    },
    {
      id: 6,
      name: 'Skol Beats Senses 313ml',
      price: '4.49',
      urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
    },
    {
      id: 7,
      name: 'Becks 330ml',
      price: '4.99',
      urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
    },
    {
      id: 8,
      name: 'Brahma Duplo Malte 350ml',
      price: '2.79',
      urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
    },
    {
      id: 9,
      name: 'Becks 600ml',
      price: '8.89',
      urlImage: 'http://localhost:3001/images/becks_600ml.jpg',
    },
    {
      id: 10,
      name: 'Skol Beats Senses 269ml',
      price: '3.57',
      urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
    },
    {
      id: 11,
      name: 'Stella Artois 275ml',
      price: '3.49',
      urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '1264',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWQiOjUsImlhdCI6MTY3NzExNDA4NywiZXhwIjoxNjc4ODQyMDg3fQ.kXL3HuO5ofoiw_ZXNsvjUe0o2pgB7Kpu31jCmtqBXyA',
    },
    method: 'get',
    url: 'http://localhost:3001/products',
  },
  request: {},
};

const secondAxiosCallMock = {
  data: [
    {
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: 'a4c86edecc5aee06eff8fdeda69e0d04',
      role: 'administrator',
    },
    {
      id: 2,
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      password: '3c28d2b0881bf46457a853e0b07531c6',
      role: 'seller',
    },
    {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
      role: 'customer',
    },
    {
      id: 5,
      name: 'Cliente zika',
      email: 'cliente@hotmail.com',
      password: '0dced281d75c3f1d2352bb28454ebc46',
      role: 'customer',
    },
    {
      id: 6,
      name: 'Vendedor zika',
      email: 'vendedor@hotmail.com',
      password: 'fee8bc8bb31d184765fa7f7886257cfb',
      role: 'seller',
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '1610',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWQiOjUsImlhdCI6MTY3NzExNDA4NywiZXhwIjoxNjc4ODQyMDg3fQ.kXL3HuO5ofoiw_ZXNsvjUe0o2pgB7Kpu31jCmtqBXyA',
    },
    method: 'get',
    url: 'http://localhost:3001/users',
  },
  request: {},
};

const forthAxiosCallMock = {
  data: [
    {
      id: 2,
      userId: 5,
      sellerId: 2,
      totalPrice: '7.50',
      deliveryAddress: 'Loteamento Caribe',
      deliveryNumber: null,
      saleDate: '2023-02-23T03:02:48.000Z',
      status: 'Pendente',
      products: [
        {
          id: 2,
          name: 'Heineken 600ml',
          price: '7.50',
          urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
          SalesProduct: {
            saleId: 2,
            productId: 2,
            quantity: 1,
          },
        },
      ],
      seller: {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
      },
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '486',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWQiOjUsImlhdCI6MTY3NzExNDA4NywiZXhwIjoxNjc4ODQyMDg3fQ.kXL3HuO5ofoiw_ZXNsvjUe0o2pgB7Kpu31jCmtqBXyA',
    },
    method: 'get',
    url: 'http://localhost:3001/customer/orders/2',
  },
  request: {},
};

const inTransitOrder = {
  data: [
    {
      id: 2,
      userId: 5,
      sellerId: 2,
      totalPrice: '7.50',
      deliveryAddress: 'Loteamento Caribe',
      deliveryNumber: null,
      saleDate: '2023-02-23T03:02:48.000Z',
      status: 'Em Trânsito',
      products: [
        {
          id: 2,
          name: 'Heineken 600ml',
          price: '7.50',
          urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
          SalesProduct: {
            saleId: 2,
            productId: 2,
            quantity: 1,
          },
        },
      ],
      seller: {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
      },
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '486',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWQiOjUsImlhdCI6MTY3NzExNDA4NywiZXhwIjoxNjc4ODQyMDg3fQ.kXL3HuO5ofoiw_ZXNsvjUe0o2pgB7Kpu31jCmtqBXyA',
    },
    method: 'get',
    url: 'http://localhost:3001/customer/orders/2',
  },
  request: {},
};
const inTransitUpdate = {
  data: [
    {
      id: 2,
      userId: 5,
      sellerId: 2,
      totalPrice: '7.50',
      deliveryAddress: 'Loteamento Caribe',
      deliveryNumber: null,
      saleDate: '2023-02-23T03:02:48.000Z',
      status: 'Entregue',
      products: [
        {
          id: 2,
          name: 'Heineken 600ml',
          price: '7.50',
          urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
          SalesProduct: {
            saleId: 2,
            productId: 2,
            quantity: 1,
          },
        },
      ],
      seller: {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
      },
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '486',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWQiOjUsImlhdCI6MTY3NzExNDA4NywiZXhwIjoxNjc4ODQyMDg3fQ.kXL3HuO5ofoiw_ZXNsvjUe0o2pgB7Kpu31jCmtqBXyA',
    },
    method: 'get',
    url: 'http://localhost:3001/customer/orders/2',
  },
  request: {},
};

const registerPostMock = {
  data: {
    response: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksIm5hbWUiOiJUaGlhZ28gVGVpeGVpcmEgQmFyYm9zYSIsImVtYWlsIjoiMzIxM0AzMjEzMjEuY29tIiwicGFzc3dvcmQiOiI2NTIwMzU1NzFmNDg5YTM1NzM4NWFlZmFlZGFjZjljMSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NzE3Nzg5NSwiZXhwIjoxNjc4OTA1ODk1fQ.cz50bvXqT6sSXPHfNRDNYUTq-xp4Yw2vNkGihv_r8BE',
    },
  },
  status: 201,
  statusText: 'Created',
  headers: {
    'content-length': '328',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    method: 'post',
    url: 'http://localhost:3001/users',
    data: '{"name":"Thiago Teixeira Barbosa","email":"3213@321321.com","password":"321321312"}',
  },
  request: {},
};


describe('Consumer should work as intended', () => {
  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  it('test in customer', async () => {
    const spy = jest
      .spyOn(axios, 'request')
      .mockResolvedValueOnce(fetchProductsMock)
      .mockResolvedValueOnce(secondAxiosCallMock)
      .mockResolvedValueOnce({
        data: {
          response: {
            data: { id: 1 },
          },
        },
      })
      .mockResolvedValueOnce(forthAxiosCallMock);
    jest.spyOn(axios, 'post').mockResolvedValueOnce(consumerLoginResponse);
    renderWithRouterAndRedux(<App />);
    
    const emailInput = screen.getByTestId('common_login__input-email');
    const clientEmail = 'cliente@hotmail.com';
    userEvent.type(emailInput, clientEmail);
    expect(emailInput).toHaveValue(clientEmail);

    const passwordInput = screen.getByTestId('common_login__input-password');
    const clientPassword = '1234567Bb';
    userEvent.type(passwordInput, clientPassword);
    expect(passwordInput).toHaveValue(clientPassword);

    const submitButton = screen.getByRole('button', {
      name: /login/i,
    });

    await waitFor(() => expect(submitButton).toBeEnabled());

    await act(async () => userEvent.click(submitButton)); 

    const cartButton = await screen.findByRole('button', {
      name: /ver carrinho: r\$: 0,00/i,
    });

    const token = getLocalStorage('user')?.token;
    const fetchProductsOptions = {
        headers: {
          Authorization: token,
        },
        method: 'get',
        url: 'http://localhost:3001/products',
    }

    expect(cartButton).toBeInTheDocument()
    expect(spy).toHaveBeenCalledWith(fetchProductsOptions);

    const firstProductIncrement = screen.getByTestId(
      'customer_products__button-card-add-item-1',
    );
    const firstProductDecrement = screen.getByTestId(
      'customer_products__button-card-rm-item-1',
    );
    const firstProductSetQuantity = screen.getByTestId(
      'customer_products__input-card-quantity-1',
    );

    userEvent.click(firstProductIncrement);
    expect(cartButton).toHaveTextContent(/2,20/);
    expect(firstProductSetQuantity).toHaveValue('1');
    
    userEvent.click(firstProductIncrement);
    expect(cartButton).toHaveTextContent(/4,40/);
    expect(firstProductSetQuantity).toHaveValue('2');

    userEvent.click(firstProductDecrement);
    expect(cartButton).toHaveTextContent(/2,20/);
    expect(firstProductSetQuantity).toHaveValue('1');

    userEvent.click(firstProductDecrement);
    expect(cartButton).toHaveTextContent(/0,00/);
    expect(firstProductSetQuantity).toHaveValue('0');

    userEvent.type(firstProductSetQuantity, '10');
    expect(cartButton).toHaveTextContent(/22,00/);
    expect(firstProductSetQuantity).toHaveValue('10');

    userEvent.type(firstProductSetQuantity, 'a');
    expect(cartButton).toHaveTextContent(/22,00/);
    expect(firstProductSetQuantity).toHaveValue('10');
  
    userEvent.clear(firstProductSetQuantity);
    expect(cartButton).toHaveTextContent(/0,00/);
    expect(firstProductSetQuantity).toHaveValue('0');


    userEvent.click(firstProductIncrement);
    expect(cartButton).toHaveTextContent(/2,20/);
    expect(firstProductSetQuantity).toHaveValue('1');

    const secondProductIncrement = screen.getByTestId(
      'customer_products__button-card-add-item-2',
    );
    const secondProductDecrement = screen.getByTestId(
      'customer_products__button-card-rm-item-2',
    );
    const secondProductSetQuantity = screen.getByTestId(
      'customer_products__input-card-quantity-2',
    );

    userEvent.click(secondProductIncrement);
    expect(cartButton).toHaveTextContent(/9,70/);
    expect(secondProductSetQuantity).toHaveValue('1');

    userEvent.clear(secondProductSetQuantity);
    userEvent.type(secondProductSetQuantity, '2');
    userEvent.type(secondProductSetQuantity, '0');
    userEvent.keyboard('[Backspace]');
    expect(cartButton).toHaveTextContent(/17,20/);
    userEvent.keyboard('[Backspace]');
    expect(cartButton).toHaveTextContent(/2,20/);
    expect(secondProductSetQuantity).toHaveValue('0');

    userEvent.click(secondProductIncrement);
    expect(cartButton).toHaveTextContent(/9,70/);
    expect(secondProductSetQuantity).toHaveValue('1');

    userEvent.click(secondProductDecrement);
    expect(cartButton).toHaveTextContent(/2,20/);
    expect(secondProductSetQuantity).toHaveValue('0');

    userEvent.click(secondProductIncrement);
    expect(cartButton).toHaveTextContent(/9,70/);
    expect(secondProductSetQuantity).toHaveValue('1');

    await act(async () => userEvent.click(cartButton)); 

    const firstProductItem = await screen.findByRole('cell', {
      name: /skol lata 250ml/i,
    });

    expect(firstProductItem).toBeInTheDocument();

    const totalOrderPrice = screen.getByRole('heading', {
      name: /total:/i,
    });

    expect(totalOrderPrice).toHaveTextContent(/9,70/);
   
    const row = screen.getByRole('row', {
      name: /skol lata/i,
    });
    const removeButton = within(row).getByRole('button', { name: /remover/i });
    expect(row).toBeInTheDocument()
    expect(removeButton).toBeInTheDocument();

    userEvent.click(removeButton);

    expect(totalOrderPrice).toHaveTextContent(/7,50/);

    const address = screen.getByTestId('customer_checkout__input-address');
    expect(address).toBeInTheDocument();
    const addressValue = 'Loteamento Caribe';

    userEvent.type(address, addressValue);
    expect(address).toHaveValue(addressValue);
    
    const numberInput = screen.getByTestId(
      'customer_checkout__input-address-number',
    );
 
    expect(numberInput).toBeVisible();

    userEvent.type(numberInput, '42');
    await act(async () => expect(numberInput).toHaveValue('42'));

    const finishButton = screen.getByRole('button', {
      name: /finalizar pedido/i,
    });

    expect(finishButton).toBeEnabled()
    await act(async () => userEvent.click(finishButton));
    
    const orderNumber = await screen.findByTestId(
      'customer_order_details__element-order-details-label-order-id',
    );
    expect(orderNumber).toBeInTheDocument();

    const logout = screen.getByTestId(
      'customer_products__element-navbar-link-logout',
    );

    await act(async () => userEvent.click(logout));

    const loggedOut = await screen.findByTestId("common_login__input-email");
    expect(loggedOut).toBeInTheDocument();
  })
  it('consumer should be able to mark as received', async () => {

    setLocalStorage('user', {
      name: 'Cliente zika',
      email: 'cliente@hotmail.com',
      role: 'customer',
      id: 5,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwiZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWQiOjUsImlhdCI6MTY3NzExNDA4NywiZXhwIjoxNjc4ODQyMDg3fQ.kXL3HuO5ofoiw_ZXNsvjUe0o2pgB7Kpu31jCmtqBXyA',
    });
        const spy = jest
          .spyOn(axios, 'request')
          .mockResolvedValueOnce(inTransitOrder)
          .mockResolvedValueOnce(inTransitUpdate);
    renderWithRouterAndRedux(<OrderDetail />);

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    const inTransitBtn = screen.getByTestId("customer_order_details__button-delivery-check");
    expect(inTransitBtn).toBeEnabled();
    act(() => userEvent.click(inTransitBtn));
  })
  it('should be able to register a new user successfully', async () => {
    const spy = jest
      .spyOn(axios, 'request')
      .mockResolvedValueOnce(fetchProductsMock);
    const postSpy = jest
      .spyOn(axios, 'post')
      .mockResolvedValueOnce(registerPostMock);
    renderWithRouterAndRedux(<App />);
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    userEvent.click(signUpButton);

    const fullNameInput = screen.getByTestId('common_register__input-name');
    expect(fullNameInput).toBeInTheDocument();
    const emailInput = screen.getByTestId('common_register__input-email');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('common_register__input-password');
    expect(passwordInput).toBeInTheDocument();
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeDisabled();

    const invalidName = 'Thiago';
    const validFullName = ' Barbosa';
    const invalidEmail = 'tryber';
    const validEmailSuffix = '@test.com';
    const invalidPassword = '1234';
    const validPasswordSuffix = '5678';

    userEvent.type(fullNameInput, invalidName);
    expect(fullNameInput).toHaveValue(invalidName);

    userEvent.type(emailInput, invalidEmail);
    expect(emailInput).toHaveValue(invalidEmail);

    userEvent.type(passwordInput, invalidPassword);
    expect(passwordInput).toHaveValue(invalidPassword);

    const invalidNameError = await screen.findByText(
      /nome completo deve ter pelo menos 12 letras/i,
    );

    const invalidEmailError = screen.getByText(
      /email deve ser no formato exemplo@exemplo\.com/i,
    );

    expect(invalidNameError).toBeVisible();
    expect(invalidEmailError).toBeVisible();

    await act(async () => userEvent.type(fullNameInput, validFullName));

    const invalidPasswordLengthError = screen.getByText(
      /Password is too short!/i,
    );
    expect(invalidPasswordLengthError).toBeVisible();

    expect(fullNameInput).toHaveValue(`${invalidName}${validFullName}`);

    await act(async () => userEvent.type(emailInput, validEmailSuffix));
    expect(emailInput).toHaveValue(`${invalidEmail}${validEmailSuffix}`);

    await act(async () => userEvent.type(passwordInput, validPasswordSuffix));
    expect(passwordInput).toHaveValue(
      `${invalidPassword}${validPasswordSuffix}`,
    );

    expect(registerButton).toBeEnabled();
    await act(async () => userEvent.click(registerButton));

    await waitFor(async () => expect(postSpy).toHaveBeenCalled());
  })
  it('should not be able to register an existing user', async () => {
    const postSpy = jest
      .spyOn(axios, 'post')
      .mockRejectedValueOnce({ response: { status: 409 }});
    renderWithRouterAndRedux(<App />);
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    userEvent.click(signUpButton);

    const fullNameInput = screen.getByTestId('common_register__input-name');
    expect(fullNameInput).toBeInTheDocument();
    const emailInput = screen.getByTestId('common_register__input-email');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('common_register__input-password');
    expect(passwordInput).toBeInTheDocument();
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeDisabled();

    const invalidName = 'Thiago';
    const validFullName = ' Barbosa';
    const invalidEmail = 'tryber';
    const validEmailSuffix = '@test.com';
    const invalidPassword = '1234';
    const validPasswordSuffix = '5678';

    userEvent.type(fullNameInput, invalidName);
    expect(fullNameInput).toHaveValue(invalidName);

    userEvent.type(emailInput, invalidEmail);
    expect(emailInput).toHaveValue(invalidEmail);

    userEvent.type(passwordInput, invalidPassword);
    expect(passwordInput).toHaveValue(invalidPassword);

    const invalidNameError = await screen.findByText(
      /nome completo deve ter pelo menos 12 letras/i,
    );

    const invalidEmailError = screen.getByText(
      /email deve ser no formato exemplo@exemplo\.com/i,
    );

    expect(invalidNameError).toBeVisible();
    expect(invalidEmailError).toBeVisible();

    await act(async () => userEvent.type(fullNameInput, validFullName));

    const invalidPasswordLengthError = screen.getByText(
      /Password is too short!/i,
    );
    expect(invalidPasswordLengthError).toBeVisible();

    expect(fullNameInput).toHaveValue(`${invalidName}${validFullName}`);

    await act(async () => userEvent.type(emailInput, validEmailSuffix));
    expect(emailInput).toHaveValue(`${invalidEmail}${validEmailSuffix}`);

    await act(async () => userEvent.type(passwordInput, validPasswordSuffix));
    expect(passwordInput).toHaveValue(
      `${invalidPassword}${validPasswordSuffix}`,
    );

    expect(registerButton).toBeEnabled();
    await act(async () => userEvent.click(registerButton));

    await waitFor(async () => expect(postSpy).toHaveBeenCalled());
    const emailAlreadyRegisteredError = screen.getByTestId(
      'common_register__element-invalid_register',
    );
    expect(emailAlreadyRegisteredError).toBeVisible()
  })
})