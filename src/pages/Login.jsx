import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    isLoading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
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
      <div className="Login" data-testid="page-login">
        <img
          src="https://static.thenounproject.com/png/417102-200.png"
          alt="Login"
        />

        <div className="LoginDiv">
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
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
