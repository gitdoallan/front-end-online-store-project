import React from "react";

export default class Search extends React.Component {
  render() {
    return(
      <>
        <input type="text"></input>
        <p data-testid="home-initial-message">Digite algum termo de pesquisa ou escolha uma categoria.</p>
      </>
    );
  }
}