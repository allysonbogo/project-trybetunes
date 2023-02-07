import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      this.setState({
        favoriteSongs: await getFavoriteSongs(),
        isLoading: false,
      });
    });
  }

  isFavorite = (song) => {
    const { favoriteSongs } = this.state;
    let validation = false;
    if (favoriteSongs
      .some((favoriteSong) => favoriteSong.trackId === song.trackId)) validation = true;
    return validation;
  };

  handleChange = (song) => {
    this.setState({
      isLoading: true,
    }, async () => {
      if (this.isFavorite(song)) removeSong(song);
      if (!this.isFavorite(song)) addSong(song);
      this.setState({
        favoriteSongs: await getFavoriteSongs(),
        isLoading: false,
      });
    });
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />

        {isLoading ? <Loading /> : (
          favoriteSongs.map((song) => (
            <div key={ song.trackId }>
              <p>{ song.trackName }</p>

              <audio data-testid="audio-component" src={ song.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>

              <label
                htmlFor={ `favorite-music-${song.trackId}` }
                data-testid={ `checkbox-music-${song.trackId}` }
              >
                Favorita
                <input
                  id={ `favorite-music-${song.trackId}` }
                  type="checkbox"
                  name="favorite-input"
                  checked={ favoriteSongs
                    .some((favoriteSong) => favoriteSong.trackId === song.trackId) }
                  onChange={ () => this.handleChange(song) }
                />
              </label>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
