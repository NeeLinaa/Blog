import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';
import { saveData, getData, claerData } from '../../localStorage';

import './EditProfile.scss';

const EditProfile = ({ editProfile }) => {
  const apiServices = new ApiServices();
  const [updateUser, setUpdateUser] = useState(false);
  const [userName, setUserName] = useState(getData('userName'));
  const [userImage, setUserImage] = useState(getData('userImage'));
  const userToken = getData('userToken');
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const { Username, Email, NewPassword, image } = data;
    setUpdateUser(true);
    if (userToken) {
      apiServices.updateUser(Username, Email, NewPassword, image);
      claerData(userName);
      claerData(userImage);
    }
  };
  if (updateUser) {
    apiServices.getUser(userToken).then((data) => {
      saveData('userName', data.user.username);
      setUserName(data.user.username);
      saveData('userImage', data.user.image);
      setUserImage(data.user.image);
    });
    editProfile(true);
  }
  // if (updateUser) editProfile(true);
  return (
    <div className="formBlock" style={{ height: 498 }}>
      <p className="formHeader">Edit Profile</p>
      <form className="accFormInputs">
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
          minLength="3"
          maxLength="20"
        />
        {errors.Username && <p>This is required</p>}

        <label className="formText" htmlFor="mail">
          Email address
        </label>
        <input id="mail" type="email" className="formInput" ref={register} name="Email" placeholder="Email address" />
        {errors.Email && <p>This is required</p>}

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
        {errors.NewPassword && <p>This is required</p>}

        <label className="formText" htmlFor="img">
          Avatar image (url)
        </label>
        <input id="img" type="text" className="formInput" ref={register} name="image" placeholder="Avatar image" />

        <input className="newAccBtn" type="submit" value="Save" onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};

EditProfile.defaultProps = {
  editProfile: () => {},
};

EditProfile.propTypes = {
  editProfile: PropTypes.func,
};

export default connect(null, actions)(EditProfile);
