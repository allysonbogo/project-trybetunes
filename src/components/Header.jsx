import React, { Component } from 'react';
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
        <h2 data-testid="header-user-name">
          Olá
          {' '}
          { name }
          !
        </h2>
      </header>
    );
  }
}

export default Header;
