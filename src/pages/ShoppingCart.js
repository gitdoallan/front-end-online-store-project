import React from "react";

export default class ShoppingCart extends React.Component {
  render() {
    return(
      <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
    );
  }
}