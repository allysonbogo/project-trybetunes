import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    albumInfo: [],
    albumSongs: [],
    isLoading: false,
  };

  componentDidMount() {
    this.requestAlbum();
  }

  requestAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      isLoading: true,
    }, () => {
      this.setState({
        albumInfo: response[0],
        albumSongs: response.filter((song) => song.trackId),
        isLoading: false,
      });
    });
  };

  render() {
    const { albumInfo, albumSongs, isLoading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        {isLoading ? <Loading /> : (
          <MusicCard
            albumInfo={ albumInfo }
            albumSongs={ albumSongs }
          />
        )}
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
