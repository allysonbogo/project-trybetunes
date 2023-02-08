import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    description: '',
    image: '',
  };

  componentDidMount() {
    this.requestUser();
  }

  requestUser = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        name: user.name,
        email: user.email,
        description: user.description,
        image: user.image,
        isLoading: false,
      });
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      await updateUser({ name, email, description, image });
      history.push('/profile');
    });
  };

  validateEmail = (email) => String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

  isButtonDisabled = () => {
    const { name, email, description, image } = this.state;
    let validation = true;
    if (name.length > 0
      && description.length > 0
      && image.length > 0
      && this.validateEmail(email)) validation = false;
    return validation;
  };

  render() {
    const { isLoading, name, email, description, image } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />

        {isLoading ? <Loading /> : (
          <form className="ProfileEdit" onSubmit={ this.handleClick }>
            <div className="ImageEdit">
              <img
                src={ image || 'https://180dc.org/wp-content/uploads/2018/05/missing.jpg' }
                alt={ `Foto de ${name}` }
                data-testid="profile-image"
              />

              <input
                id="image-input"
                type="text"
                name="image"
                value={ image }
                onChange={ this.handleChange }
                data-testid="edit-input-image"
              />
            </div>

            <div className="ProfileInfo">
              <label htmlFor="name-input">
                <h4>Nome</h4>
                <input
                  id="name-input"
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                  data-testid="edit-input-name"
                />
              </label>

              <label htmlFor="email-input">
                <h4>E-mail</h4>
                <input
                  id="email-input"
                  type="text"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                  data-testid="edit-input-email"
                />
              </label>

              <label htmlFor="description-input">
                <h4>Descrição</h4>
                <input
                  id="description-input"
                  type="text"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                  data-testid="edit-input-description"
                />
              </label>
              <p>
                <button
                  type="submit"
                  disabled={ this.isButtonDisabled() }
                  data-testid="edit-button-save"
                >
                  Salvar
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
