import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    isLoading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    const { name } = user;
    this.setState({
      name,
      isLoading: false,
    });
  }

  render() {
    const { name, isLoading } = this.state;

    if (isLoading) return <Loading />;

    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">
          Pesquisar
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favoritas
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Perfil
        </Link>
        <span data-testid="header-user-name">
          Olá,
          {' '}
          { name }
          !
        </span>
      </header>
    );
  }
}

export default Header;
