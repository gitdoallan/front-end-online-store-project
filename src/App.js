import React from 'react';
import Search from './components/Search';
import * as api from './services/api';

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
      <Search />
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
