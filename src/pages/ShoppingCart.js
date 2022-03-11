import React from 'react';
import * as api from '../services/api';

export default class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      productQty: [],
    };
    this.initialState = this.initialState.bind(this);
    this.increaseQty = this.increaseQty.bind(this);
    this.decreaseQty = this.decreaseQty.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.initialState();
  }

  initialState() {
    const { addedToCart } = this.props;
    addedToCart.forEach(async (id) => {
      const result = await api.getProductDetails(id);
      this.setState((previousState) => (
        {

          products: [...previousState.products, result],
          productQty: [...previousState.productQty, { [result.id]: 1, id: result.id }],
        }));
    });
  }

  increaseQty(id) {
    const { productQty } = this.state;
    const findProduct = productQty.find((element) => element.id === id);
    const index = productQty.indexOf(findProduct);
    console.log(findProduct);
    console.log(index);
    this.setState((prevState) => [ {
        productQty: [...prevState.productQty,
          { [findProduct.id] : prevState.productQty[index][id] + 1 } ]
        }])
  }

  decreaseQty(id) {
    console.log('menos um');
  }

  removeItem(id) {
    console.log('item removido');
  }

  render() {
    const { products, productQty } = this.state;
    console.log(this.state);
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
              <p>
                Quantidade: { productQty[element.id] }
              </p>
              <button type="button" onClick={ () => this.increaseQty(element.id) }>Aumentar 1</button>
              <button type="button" onClick={ () => this.decreaseQty(element.id) }>Diminuir 1</button>
              <button type="button" onClick={ () => this.removeItem(element.id) }>Remover do carrinho</button>
              <p data-testid="shopping-cart-product-quantity">1</p>
            </div>
          ))}
      </div>
    );
  }
}
