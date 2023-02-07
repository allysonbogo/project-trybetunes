import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    isLoading: false,
    userInfo: {},
  };

  componentDidMount() {
    this.requestUser();
  }

  requestUser = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      this.setState({
        userInfo: await getUser(),
        isLoading: false,
      });
    });
  };

  render() {
    const { isLoading, userInfo } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <p style={ { display: 'none' } }>{ userInfo.name }</p>
        {isLoading ? <Loading /> : (
          <div>
            <img
              src={ userInfo.image }
              alt={ `Foto de ${userInfo.name}` }
              data-testid="profile-image"
            />

            <Link to="/profile/edit">
              Editar perfil
            </Link>

            <h4>Nome</h4>
            <p>{ userInfo.name }</p>

            <h4>E-mail</h4>
            <p>{ userInfo.email }</p>

            <h4>Descrição</h4>
            <p>{ userInfo.description }</p>
          </div>
        ) }
      </div>
    );
  }
}

export default Profile;
