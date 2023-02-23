import React, { useMemo } from 'react';
import CardSales from '../../components/CardSales/CardSales';
import Header from '../../components/Header/Header';
import useFetch from '../../hooks/useFetch';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './CustomerOrders.module.css';

const role = 'customer';

function CustomerOrders() {
  const fetchOptions = useMemo(() => ({
    method: 'get',
    url: 'http://localhost:3001/checkout',
    headers: { Authorization: getLocalStorage('user')?.token },
  }), []);

  const [data, isLoading] = useFetch(fetchOptions);
  const datas = data?.data;
  return (
    <div className={ styles['orders-page'] }>
      <Header />
      <div className={ styles.container }>

        {!isLoading
            && datas?.map((index) => (
              <div className={ styles.card } key={ index.id }>
                <CardSales order={ index } role={ role } dataTestid={ role } />
              </div>
            ))}
      </div>
    </div>
  );
}

export default CustomerOrders;
