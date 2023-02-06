import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.setState({
      favoriteSongs: JSON.parse(localStorage.getItem('favorite_songs')),
    });
  }

  handleChange = (song) => {
    this.setState({
      isLoading: true,
    }, async () => {
      await addSong(song);
      this.setState({
        isLoading: false,
        favoriteSongs: JSON.parse(localStorage.getItem('favorite_songs')),
      });
    });
  };

  render() {
    const { albumInfo, albumSongs } = this.props;
    const { isLoading, favoriteSongs } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div>
        { albumInfo.artworkUrl100
        && <img
          src={ albumInfo.artworkUrl100 }
          alt={ `Capa do álbum ${albumInfo.collectionName}` }
        /> }
        <h2 data-testid="album-name">
          { albumInfo.collectionName }
        </h2>

        <h3 data-testid="artist-name">
          { albumInfo.artistName }
        </h3>

        {
          albumSongs.map((song) => (
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
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumInfo: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  albumSongs: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func,
    }),
  ).isRequired,
};

export default MusicCard;
