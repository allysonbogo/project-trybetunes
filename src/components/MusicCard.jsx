import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  handleChange = (song) => {
    this.setState({
      isLoading: true,
    }, () => {
      addSong(song);
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const { isLoading } = this.state;
    const { albumInfo, artist, album, image } = this.props;

    if (isLoading) return <Loading />;

    return (
      <div>
        <img src={ image } alt={ `Capa do álbum ${album}` } />
        <h2 data-testid="album-name">
          { album }
        </h2>

        <h3 data-testid="artist-name">
          { artist }
        </h3>

        {
          albumInfo.filter((song) => song.trackId)
            .map((song) => (
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
                    checked={ false }
                    onChange={ () => this.handleChange(song) }
                  />
                </label>
              </div>
            ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumInfo: PropTypes.arrayOf(
    PropTypes.shape({
      filter: PropTypes.func,
    }),
  ).isRequired,
};

export default MusicCard;
