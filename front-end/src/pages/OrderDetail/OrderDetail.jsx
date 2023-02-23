import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Header from '../../components/Header/Header';
import OrderTable from '../../components/OrderTable/OrderTable';
import useFetch from '../../hooks/useFetch';
import { priceFormatter } from '../../utils/dataFormat';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './OrderDetail.module.css';

const numberFormatter = new Intl.NumberFormat('pt-BR', {
  minimumIntegerDigits: 4,
  useGrouping: false,
});

const dateFormatter = new Intl.DateTimeFormat('pt-br');

function OrderDetail() {
  const {
    params: { id },
  } = useRouteMatch();
  const userData = useMemo(() => getLocalStorage('user'), []);
  const fetchOptions = useMemo(
    () => ({
      method: 'get',
      url: `http://localhost:3001/customer/orders/${id}`,
      headers: { Authorization: userData.token },
    }),
    [id, userData],
  );

  const DATA_TESTID = {
    orderId: `${userData.role}_order_details__element-order-details-label-order-id`,
    seller: `${userData.role}_order_details__element-order-details-label-seller-name`,
    date: `${userData.role}_order_details__element-order-details-label-order-date`,
    status: `${userData.role}_order_details__element-order-details-label-delivery-status`,
    submit: `${userData.role}_order_details__button-delivery-check`,
    preparing: 'seller_order_details__button-preparing-check',
    dispatch: 'seller_order_details__button-dispatch-check',
    totalPrice: `${userData.role}_order_details__element-order-total-price`,
  };

  const isCustomer = userData?.role === 'customer';

  const [apiResponse, isLoading] = useFetch(fetchOptions);
  const [updatedResponse, setUpdatedResponse] = useState(null);

  const handleUpdateOrder = async (status) => {
    const updateOptions = {
      url: `http://localhost:3001/checkout/${id}`,
      method: 'put',
      data: { status },
      headers: { Authorization: getLocalStorage('user')?.token },
    };

    const response = await axios.request(updateOptions);
    setUpdatedResponse(response);
  };
  if (isLoading || !apiResponse) {
    return <span>Loading...</span>;
  }

  const data = updatedResponse?.data[0] || apiResponse.data[0];

  return (
    <div>
      <Header />
      <h2 className={ styles.title }>Detalhes do Pedido</h2>
      <section className={ styles.container }>
        <div className={ styles.head }>
          <div className={ styles.pedido }>
            <span>{'Pedido '}</span>
            <span data-testid={ DATA_TESTID.orderId }>
              {numberFormatter.format(data.id)}
            </span>
          </div>
          <span
            className={ styles.name }
            data-testid={ DATA_TESTID.seller }
          >
            {data.seller.name}
          </span>
          <span className={ styles.date } data-testid={ DATA_TESTID.date }>
            {dateFormatter.format(new Date(data.saleDate))}
          </span>
          <span
            className={ styles.status }
            data-testid={ DATA_TESTID.status }
          >
            {data.status}
          </span>
          {isCustomer ? (
            <button
              className={ styles.button }
              data-testid={ DATA_TESTID.submit }
              type="button"
              disabled={ data.status !== 'Em Trânsito' }
              onClick={ () => handleUpdateOrder('Entregue') }
            >
              MARCAR COMO ENTREGUE
            </button>
          ) : (
            <>
              <button
                className={ styles.button }
                data-testid={ DATA_TESTID.preparing }
                type="button"
                disabled={ data.status !== 'Pendente' }
                onClick={ () => handleUpdateOrder('Preparando') }
              >
                MARCAR COMO PREPARANDO
              </button>
              <button
                className={ styles.button }
                data-testid={ DATA_TESTID.dispatch }
                type="button"
                disabled={ data.status !== 'Preparando' }
                onClick={ () => handleUpdateOrder('Em Trânsito') }
              >
                MARCAR COMO EM TRÂNSITO
              </button>
            </>
          )}
        </div>
        <OrderTable products={ data.products } role={ userData.role } />
        <div className={ styles.total }>
          <span data-testid={ DATA_TESTID.totalPrice }>
            {`Total: R$ ${priceFormatter.format(data.totalPrice)}`}
          </span>
        </div>
      </section>
    </div>
  );
}

export default OrderDetail;
