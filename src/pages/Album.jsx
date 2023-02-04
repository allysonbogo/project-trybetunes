import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    albumsList: [],
    isLoading: true,
  };

  // componentDidMount() {
  //   this.requestAlbums();
  // }

  requestAlbums = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await searchAlbumsAPI(id);
    this.setState({
      albumsList: response,
      isLoading: false,
    });
  };

  render() {
    const { albumsList, isLoading } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div data-testid="page-album">
        <Header />

        {
          albumsList.map((album) => (
            <div
              key={ album.collectionId }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <p>album.collectionName</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Album;
