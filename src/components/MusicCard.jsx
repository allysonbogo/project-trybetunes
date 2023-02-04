import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  handleChange = async (song) => {
    this.setState({
      isLoading: true,
    }, async () => {
      await addSong(song);
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const { albumInfo } = this.props;
    const { isLoading } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div>
        {
          albumInfo.filter((song) => song.collectionType)
            .map((song) => (
              <div key={ song.collectionId }>
                <h2 data-testid="album-name">{ song.collectionName }</h2>
                <h3 data-testid="artist-name">{ song.artistName }</h3>
              </div>
            ))
        }
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
