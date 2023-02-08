import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    search: '',
    albumsList: [],
    artist: '',
    isLoading: false,
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
      isLoading: true,
    }, () => {
      this.setState({
        search: '',
        artist: search,
        isLoading: false,
      });
    });
  };

  albumsContainer = () => {
    const { albumsList, artist } = this.state;
    return (
      <div className="SearchAlbum">
        <h2>
          {`Resultado de álbuns de: ${artist}`}
          {' '}
        </h2>
        {
          albumsList.map((album) => (
            <div className="AlbumCard" key={ album.collectionId }>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <h3>{ album.collectionName }</h3>
                <p>{ album.artistName }</p>
              </Link>
            </div>
          ))
        }
      </div>
    );
  };

  render() {
    const { search, albumsList, artist, isLoading } = this.state;
    const results = albumsList ? (
      <div>
        { this.albumsContainer() }
      </div>
    ) : <p>Nenhum álbum foi encontrado</p>;

    return (
      <div data-testid="page-search">
        <Header />

        <div className="Search">
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
        </div>

        {isLoading ? <Loading /> : (
          <div>
            { artist ? results : '' }
          </div>
        )}
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
