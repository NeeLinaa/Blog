import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';
import { saveData } from '../../localStorage';

import './SignIn.scss';

const SignIn = ({ getUserData, auth }) => {
  const apiServices = new ApiServices();
  const [tokenFlag, setTokenFlag] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    apiServices.authentication(data.email, data.password).then((resp) => {
      getUserData(resp.user.username, resp.user.image);
      auth(true);
      saveData('userToken', resp.user.token);
      setTokenFlag(true);
    });
  };

  if (tokenFlag) return <Redirect to="/" />;

  return (
    <div className="formBlock" style={{ height: 384 }}>
      <p className="formHeader">Sign in</p>
      <form className="accFormInputs">
        <label className="formText" htmlFor="mail">
          Email address
        </label>
        <input id="mail" type="email" className="formInput" name="email" placeholder="Email address" ref={register} />
        {errors.email && <p>This is required</p>}

        <label className="formText" htmlFor="pass">
          Password
        </label>
        <input
          id="pass"
          type="password"
          className="formInput"
          name="password"
          placeholder="Password"
          ref={register}
          minLength="8"
          maxLength="40"
        />
        {errors.password && <p>This is required</p>}

        <input className="newAccBtn" type="submit" value="Log In" onClick={handleSubmit(onSubmit)} />
      </form>
      <p className="accFooter">
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.form.data,
  pass: state.form.pass,
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
