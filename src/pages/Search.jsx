import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artist: '',
    albumsList: [],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artist, albumsList } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        <input
          id="name-input"
          type="text"
          name="artist"
          value={ artist }
          onChange={ this.handleChange }
          data-testid="search-artist-input"
        />

        <button
          type="button"
          disabled={ artist.length < 2 }
          // onClick={ onSaveButtonClick }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
