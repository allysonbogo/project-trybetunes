import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    albumInfo: [],
  };

  componentDidMount() {
    this.requestAlbum();
  }

  requestAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      albumInfo: response,
      artist: response[0].artistName,
      album: response[0].collectionName,
      image: response[0].artworkUrl100,
    });
  };

  render() {
    const { albumInfo, artist, album, image } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        <MusicCard
          artist={ artist }
          album={ album }
          image={ image }
          albumInfo={ albumInfo }
        />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
