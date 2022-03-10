import React from "react";
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return(
      <Link data-testid="shopping-cart-button" to="/shopping-cart">[O carrinho]</Link>
    );
  }
}