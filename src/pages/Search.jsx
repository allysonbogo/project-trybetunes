import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    search: '',
    albumsList: [],
    artist: '',
  };

  componentDidMount() {
    this.handleClick();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { search } = this.state;
    const response = await searchAlbumsAPI(search);
    if (response.length === 0) this.setState({ albumsList: '' });
    if (response.length > 0) this.setState({ albumsList: response });
    this.setState({
      search: '',
      artist: search,
    });
  };

  albumsContainer = () => {
    const { albumsList, artist } = this.state;
    return (
      <div>
        <h3>
          {`Resultado de álbuns de: ${artist}`}
          {' '}
        </h3>
        {
          albumsList.map((album) => (
            <div key={ album.collectionId }>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{ album.collectionName }</p>
              </Link>
            </div>
          ))
        }
      </div>
    );
  };

  render() {
    const { search, albumsList, artist } = this.state;
    const results = albumsList ? (
      <div>
        { this.albumsContainer() }
      </div>
    ) : <p>Nenhum álbum foi encontrado</p>;

    return (
      <div data-testid="page-search">
        <Header />

        <input
          id="name-input"
          type="text"
          name="search"
          value={ search }
          onChange={ this.handleChange }
          data-testid="search-artist-input"
        />

        <button
          type="button"
          disabled={ search.length < 2 }
          onClick={ this.handleClick }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>

        <div>
          { artist ? results : '' }
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Search;
