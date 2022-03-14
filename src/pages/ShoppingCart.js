import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

export default class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.initialState = this.initialState.bind(this);
  }

  componentDidMount() {
    this.initialState();
  }

  initialState() {
    const { addedToCart } = this.props;
    addedToCart.forEach(async (id) => {
      const result = await api.getProductDetails(id);
      this.setState((previousState) => ({ products:
        [...previousState.products, result] }));
    });
  }

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <div className="cart-products">
        {products.length === 0
          ? <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
          : products.map((element) => (
            <div key={ element.id } className="product">
              <h3 data-testid="shopping-cart-product-name">{element.title}</h3>
              <img alt={ element.title } src={ element.thumbnail } />
              <p>
                Preço:
                {element.price}
              </p>
              <p data-testid="shopping-cart-product-quantity">1</p>
            </div>
          ))}
      </div>
    );
  }
}
ShoppingCart.propTypes = {
  addedToCart: PropTypes.arrayOf(PropTypes.any).isRequired,
};
