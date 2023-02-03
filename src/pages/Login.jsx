import React from 'react';
import Loading from '../components/Loading';
// import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    isLoading: false,
  };

  // componentDidMount() {
  //   this.handleClick();
  // }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name });
      history.push('/search');
    });
  };

  render() {
    const { name, isLoading } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div data-testid="page-login">
        <input
          type="text"
          name="name"
          value={ name }
          onChange={ this.handleChange }
          data-testid="login-name-input"
        />

        <button
          type="button"
          disabled={ name.length <= 2 }
          onClick={ this.handleClick }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
