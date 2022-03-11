import React from 'react';
import * as api from '../services/api';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      category: '',
      dataResults: [],
      initialMessage: true,
      loading: false,
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.searchInput = this.searchInput.bind(this);
  }

  onInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  async searchInput(e) {
    this.setState({ initialMessage: false, loading: true });
    e.preventDefault();
    const { inputValue, category } = this.state;
    const data = await api.getProductsFromCategoryAndQuery(category, inputValue);
    this.setState({ dataResults: data.results, loading: false });
  }

  render() {
    const { inputValue, loading, dataResults, initialMessage } = this.state;
    console.log(dataResults);
    return (
      <>
        <form onSubmit={ this.searchInput }>
          <input data-testid="query-input" type="text" value={ inputValue } onChange={this.onInputChange} />
          <button type="submit" data-testid="query-button">Buscar</button>
        </form>
        { initialMessage
          ? (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
          )
          : (
            <div className="results">
              { loading
                ? <span>Carregando...</span>
                : (
                  dataResults.map((element) => {
                    return (
                      <div data-testid="product" key={element.id}>
                        <img alt={element.title} src={element.thumbnail} />
                        <h3>{element.title}</h3>
                        <p>Preço: {element.price}</p>
                      </div>
                    );
                  })
                )
              }
            </div>
          )
        }
      </>
    );
  }
}
