import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';
import { getToken } from '../../localStorage';
import { mainPath } from '../../routeService';

import './EditProfile.scss';

const EditProfile = ({ getUserData, editProfile }) => {
  const [updateUser, setUpdateUser] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const userToken = getToken();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setUpdateUser(true);
    const { Username, Email, NewPassword, image } = data;
    if (userToken) {
      const userData = {
        name: Username,
        email: Email,
        pass: NewPassword,
        img: image,
      };
      ApiServices.updateUser(userData).catch(() => message.warning('Something went wrong. Try again'));
      getUserData(Username, image);
    }
    setIsDisabled(true);
  };
  const style = {
    height: 498,
  };
  const styleErr = {
    color: 'tomato',
    fontSize: '12px',
    margin: 0,
    position: 'relative',
    top: -5,
  };

  // if (!userToken) return <Redirect to={signInPath} />;

  if (updateUser) {
    editProfile(true);
    return <Redirect to={mainPath} />;
  }
  return (
    <div className="formBlock" style={style}>
      <p className="formHeader">Edit Profile</p>
      <form className="accFormInputs">
        <fieldset disabled={isDisabled}>
          <label className="formText" htmlFor="usName">
            Username
          </label>
          <input
            id="usName"
            type="text"
            className="formInput"
            ref={register({
              minLength: 3,
              maxLength: 20,
              pattern: /^[a-zA-Z]+$/,
            })}
            placeholder="Username"
            name="Username"
          />
          {errors.Username && (
            <p style={styleErr} className="formText">
              Username must be 3-20 uppercase or lowercase letters.
            </p>
          )}
          <label className="formText" htmlFor="mail">
            Email address
          </label>
          <input id="mail" type="email" className="formInput" ref={register} name="Email" placeholder="Email address" />{' '}
          <br />
          <label className="formText" htmlFor="pass">
            New password
          </label>
          <input
            id="pass"
            type="password"
            className="formInput"
            ref={register({
              minLength: 8,
              maxLength: 40,
            })}
            placeholder="New password"
            name="NewPassword"
          />
          <label className="formText" htmlFor="img">
            Avatar image (url)
          </label>
          <input id="img" type="text" className="formInput" ref={register} name="image" placeholder="Avatar image" />
          <input className="newAccBtn" type="submit" value="Save" onClick={handleSubmit(onSubmit)} />
        </fieldset>
      </form>
    </div>
  );
};

EditProfile.defaultProps = {
  getUserData: () => {},
  editProfile: () => {},
};

EditProfile.propTypes = {
  getUserData: PropTypes.func,
  editProfile: PropTypes.func,
};

export default connect(null, actions)(EditProfile);
