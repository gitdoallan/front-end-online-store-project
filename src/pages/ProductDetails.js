import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

export default class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      thumbnail: '',
      price: '',
      id: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await api.getProductDetails(id);
    this.setState({
      title: result.title,
      thumbnail: result.thumbnail,
      price: result.price,
      id: result.id });
  }

  render() {
    const { title, thumbnail, price, id } = this.state;
    return (
      <div className="product-details">
        <h3 data-testid="product-detail-name">{title}</h3>
        <img alt={ title } src={ thumbnail } />
        <p>
          Preço:
          {price}
        </p>
        <p>
          Detalhes:
          {id}
        </p>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};