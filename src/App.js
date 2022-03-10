import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import Search from './components/Search';
import Header from './components/Header';
import * as api from './services/api';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      loading: true,
    };
  }
  componentDidMount() {
    api.getCategories().then(categories => { this.setState({ categories: categories, loading: false }); })
  }
  render() {
    const { categories, loading } = this.state;
    return (
      <div className="content">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ () => (
              <>
              <Header />
              <Search />
              </> )} />

            <Route exact path="/shopping-cart" component={ ShoppingCart } />
          </Switch>
        </BrowserRouter>
      <div className="categories">
        { loading
          ? <span>Carregando...</span>
          : categories.map((element) => {
            return (
            <p key={element.id}>{element.name}</p>
          )})
        }
      </div>
      </div>
    );
  }
}

export default App;
