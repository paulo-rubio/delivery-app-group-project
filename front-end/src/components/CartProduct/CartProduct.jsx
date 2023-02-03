import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/actions/cartActions';
import styles from './CartProduct.module.css';

const priceFormatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 });

function CartProduct({ product, index }) {
  const dispatch = useDispatch();
  const handleRemove = (productData) => {
    dispatch(removeItem(productData.id));
  };
  console.log(product);
  return (
    <tr className={ styles['table-tr'] }>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
        {product.name}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        {product.quantity}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        {priceFormatter.format(product.price)}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { priceFormatter.format(Number(product.price) * product.quantity) }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
      >
        <button
          className={ styles.button }
          type="button"
          onClick={ () => {
            handleRemove(product);
          } }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}

CartProduct.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartProduct;
