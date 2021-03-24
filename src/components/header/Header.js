import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';
import { claerData, getData, saveData } from '../../localStorage';

import './Header.scss';

const Header = ({ authFlag, auth, editProfileFlag, editProfile }) => {
  const apiServices = new ApiServices();
  const userToken = getData('userToken');
  // const userName = getData('userName');
  // const userImage = getData('userImage');

  const [userName, setUserName] = useState(getData('userName'));
  const [userImage, setUserImage] = useState(getData('userImage'));

  const onLogOut = () => {
    claerData('userToken');
    claerData('userName');
    claerData('userImage');
    auth(false);
    editProfile(false);
    return <Redirect to="sign-in" />;
  };

  const showHeader = () => {
    if (authFlag || userToken) {
      return (
        <nav className="header">
          <Link to="/articles" style={{ textDecoration: 'none' }} className="text">
            Realworld Blog
          </Link>
          <div className="loginBtns">
            <Link to="/new-article" className="headerLink">
              <input type="submit" value="Create article" style={{ fontSize: 14 }} className="loginBtn" />
            </Link>
            <Link to="/profile" className="headerLink">
              <span className="authorName" style={{ marginRight: 13 }}>
                {userName || 'Name'}
              </span>
            </Link>
            <Link to="/profile" className="headerLink">
              <img className="authorPhoto" src={`${userImage}`} alt="author" />
            </Link>
            <Link to="/sign-in" className="headerLink">
              <input type="submit" value="Log Out" className="loginBtn" onClick={onLogOut} />
            </Link>
          </div>
        </nav>
      );
    }

    return (
      <nav className="header">
        <Link to="/articles" style={{ textDecoration: 'none' }} className="text">
          Realworld Blog
        </Link>
        <div className="loginBtns">
          <Link to="/sign-in" className="headerLink">
            <input type="submit" value="Sign In" className="loginBtn" />
          </Link>
          <Link to="/sign-up" className="headerLink">
            <input type="submit" value="Sign Up" className="loginBtn" />
          </Link>
        </div>
      </nav>
    );
  };

  /* eslint-disable */
  useEffect(() => {
    userName && showHeader();
    if (authFlag) {
      apiServices.getUser(getData('userToken')).then((data) => {
        saveData('userName', data.user.username);
        setUserName(data.user.username);
        saveData('userImage', data.user.image);
        setUserImage(data.user.image);
      });
    }
  }, [authFlag, editProfileFlag, userToken]);
  /* eslint-enable */

  return showHeader();
};

const mapStateToProps = (state) => ({
  authFlag: state.form.authFlag,
  editProfileFlag: state.form.editProfileFlag,
});

export default connect(mapStateToProps, actions)(Header);
