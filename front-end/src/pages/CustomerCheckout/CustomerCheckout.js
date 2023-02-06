import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../../components/CartProduct/CartProduct';
import CheckoutForms from '../../components/CheckoutForms/CheckoutForms';
import Header from '../../components/Header/Header';
import calculateTotalPrice from '../../utils/calculateTotalPrice';
import styles from './CustomerCheckout.module.css';

function CustomerCheckout() {
  const { cartProducts } = useSelector((store) => store.cart);
  console.log(cartProducts, 'produtos');
  const totalPrice = useMemo(() => calculateTotalPrice(cartProducts), [cartProducts]);
  return (
    <div className={ styles['checkout-page'] }>
      <Header />
      <table className={ styles.tableCheck }>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product, index) => (
            <CartProduct product={ product } index={ index } key={ product.id } />
          ))}
        </tbody>
      </table>
      <div className={ styles.price }>
        <h3 className={ styles.total }>
          {'Total: R$ '}
          <span data-testid="customer_checkout__element-order-total-price">
            {totalPrice}
          </span>
        </h3>
      </div>
      <CheckoutForms totalPrice={ totalPrice } products={ cartProducts } />
    </div>
  );
}

export default CustomerCheckout;
