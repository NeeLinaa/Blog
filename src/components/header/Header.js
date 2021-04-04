import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions/actions';
import { claerToken, getToken } from '../../localStorage';
import { signInPath } from '../../routeService';

import './Header.scss';

const Header = ({ authFlag, auth, editProfile, userData, history }) => {
  const userToken = getToken();

  /* eslint-disable */
  useEffect(() => {
    userData.name && showHeader();
  }, [userToken, userData.name]);
  /* eslint-enable */

  const onLogOut = () => {
    claerToken();
    auth(false);
    editProfile(false);
    history.push(signInPath);
  };

  const textDecoration = {
    textDecoration: 'none',
  };
  const fontSize = {
    fontSize: 14,
  };
  const marginRight = {
    marginRight: 13,
  };

  const showHeader = () => {
    if (authFlag || userToken) {
      return (
        <nav className="header">
          <Link to="/articles" style={textDecoration} className="text">
            Realworld Blog
          </Link>
          <div className="loginBtns">
            <Link to="/new-article" className="headerLink">
              <input type="submit" value="Create article" style={fontSize} className="loginBtn" />
            </Link>
            <Link to="/profile" className="headerLink">
              <span className="authorName" style={marginRight}>
                {userData.name || 'Name'}
              </span>
            </Link>
            <Link to="/profile" className="headerLink">
              <img className="authorPhoto" src={`${userData.image}`} alt="author" />
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
        <Link to="/articles" style={textDecoration} className="text">
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

  return showHeader();
};

const mapStateToProps = (state) => ({
  authFlag: state.form.authFlag,
  editProfileFlag: state.form.editProfileFlag,
  userData: state.userData,
});

export default withRouter(connect(mapStateToProps, actions)(Header));
