import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import Search from './components/Search';
import Header from './components/Header';
import './App.css';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <div className="content">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (
                <>
                  <Header />
                  <Search />
                </>) }
            />

            <Route
              path="/product/:id"
              render={ (props) => (
                <>
                  <Header />
                  <ProductDetails { ...props } />
                </>) }
            />

            <Route exact path="/shopping-cart" component={ ShoppingCart } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
