import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { message } from 'antd';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';
import { saveToken } from '../../localStorage';
import { mainPath, signUpPath } from '../../routeService';

import './SignIn.scss';

const SignIn = ({ getUserData, auth }) => {
  const [tokenFlag, setTokenFlag] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    await ApiServices.authentication(data.email, data.password)
      .then((resp) => {
        if (resp.errors) {
          auth(false);
          setTokenFlag(false);
          setIsDisabled(false);
        }
        getUserData(resp.user.username, resp.user.image);
        auth(true);
        saveToken(resp.user.token);
        setTokenFlag(true);
        setIsDisabled(true);
      })
      .catch(() => {
        message.warning('Enter login and password');
      });
  };

  const style = {
    height: 384,
  };

  const styleErr = {
    color: 'tomato',
    fontSize: '12px',
    margin: 0,
    position: 'relative',
    top: -5,
  };

  if (tokenFlag) return <Redirect to={mainPath} />;

  return (
    <div className="formBlock" style={style}>
      <p className="formHeader">Sign in</p>
      <form className="accFormInputs">
        <fieldset disabled={isDisabled}>
          <label className="formText" htmlFor="mail">
            Email address
          </label>
          <input
            id="mail"
            type="email"
            className="formInput"
            name="email"
            placeholder="Email address"
            ref={register({ required: true })}
          />
          {errors.email && (
            <p style={styleErr} className="formText">
              This is required
            </p>
          )}

          <label className="formText" htmlFor="pass">
            Password
          </label>
          <input
            id="pass"
            type="password"
            className="formInput"
            name="password"
            placeholder="Password"
            ref={register({
              required: true,
              minLength: 8,
              maxLength: 40,
            })}
          />
          {errors.password && (
            <p style={styleErr} className="formText">
              Password must be from 8 to 40 characters, can consist of uppercase and uppercase letters
            </p>
          )}

          <input
            className="newAccBtn"
            type="submit"
            value="Log In"
            disabled={isDisabled}
            onClick={handleSubmit(onSubmit)}
          />
        </fieldset>
      </form>
      <p className="accFooter">
        Don’t have an account? <Link to={signUpPath}>Sign Up.</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  flag: state.form.authFlag,
});

SignIn.defaultProps = {
  getUserData: () => {},
  auth: () => {},
};

SignIn.propTypes = {
  getUserData: PropTypes.func,
  auth: PropTypes.func,
};

export default connect(mapStateToProps, actions)(SignIn);
