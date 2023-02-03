import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './Card.module.css';

function CardSales({ order, role, dataTestid }) {
  console.log(dataTestid);
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = order;
  const match = useRouteMatch();

  const routeSeller = '/seller/orders';
  const routeCustomer = '/customer/orders';

  const classNameStatus = classNames(styles.default, {
    [styles.statusCustomer]: match.path === routeCustomer,
    [styles.statusSeller]: match.path === routeSeller,
  });

  const classNameDataValue = classNames(styles.default, {
    [styles.dateValueCustomer]: match.path === routeCustomer,
    [styles.dateValueSeller]: match.path === routeSeller,
  });

  return (
    <Link className={ styles['link-card'] } to={ `/${role}/orders/${id}` }>
      <div className={ styles.container }>

        <div
          className={ styles.id }
          data-testid={ `${dataTestid}_orders__element-order-id-${id}` }
        >
          <p>{`Pedido ${id}`}</p>
        </div>

        <div
          className={ classNameStatus }
          data-testid={ `${dataTestid}_orders__element-delivery-status-${id}` }
        >
          <p>{status}</p>
        </div>

        <div className={ styles.orders }>
          <div className={ styles['order-data'] }>

            <p
              className={ classNameDataValue }
              data-testid={ `${dataTestid}_orders__element-order-date-${id}` }
            >
              { moment(saleDate).format('DD/MM/YYYY') }
            </p>

            <p
              className={ classNameDataValue }
              data-testid={ `${dataTestid}_orders__element-card-price-${id}` }
            >
              {`R$ ${totalPrice}`.split('.').join(',')}
            </p>
          </div>

          { match.path === routeSeller && (
            <div
              className={ styles.address }
              data-testid={ `${dataTestid}_orders__element-card-address-${id}` }
            >
              <h2>{`${deliveryAddress}, ${deliveryNumber}`}</h2>
            </div>
          )}

        </div>

      </div>
    </Link>
  );
}

CardSales.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
  role: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default CardSales;
