import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';
import { getData } from '../../localStorage';
import { mainPath, signInPath } from '../../routeService';

import './EditProfile.scss';

const EditProfile = ({ getUserData, editProfile }) => {
  const [updateUser, setUpdateUser] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const userToken = getData('userToken');
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

  if (!userToken) return <Redirect to={signInPath} />;

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
            ref={register}
            placeholder="Username"
            name="Username"
            pattern="[A-Za-z]{3,20}"
          />
          {errors.Username && (
            <p style={styleErr} className="formText">
              Username must be from 3 to 20 characters
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
            ref={register}
            placeholder="New password"
            name="NewPassword"
            minLength="8"
            maxLength="40"
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
