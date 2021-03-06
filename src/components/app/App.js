import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/Header';
import ArticleList from '../article-list/ArticleList';
import ArticleDetails from '../article-details/ArticleDetails';
import CreateNewAcc from '../forma-create-new-acc/CreateNewAcc';
import EditProfile from '../forma-edit-profile/EditProfile';
import SignIn from '../forma-sign-in/SignIn';
import CreateArticleItem from '../create-article-item/CreateArticleItem';
import EditArticle from '../edit-article/EditArticle';
import * as actions from '../../actions/actions';
import {
  mainPath,
  articlesListPath,
  oneArticlePath,
  signInPath,
  signUpPath,
  profilePath,
  newArticlePath,
  newArticleEditPath,
} from '../../routeService';
import ApiServices from '../../services';
import PrivateRoute from '../private-route/PrivateRoute';

import './App.scss';

function App({ getUserData, auth }) {
  useEffect(() => {
    const getUserInfo = async () => {
      await ApiServices.getUser().then((data) => {
        const { username, image } = data.user;
        getUserData(username, image);
        auth(true);
      });
    };

    getUserInfo();
  }, [getUserData, auth]);

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Route path={mainPath} exact component={ArticleList} />
        <Route path={articlesListPath} exact component={ArticleList} />
        <Route
          path={oneArticlePath}
          exact
          render={({ match }) => {
            const { slug } = match.params;
            return <ArticleDetails slugProp={slug} />;
          }}
        />
        <Route path={signInPath} render={() => <SignIn />} />
        <Route path={signUpPath} render={() => <CreateNewAcc />} />
        <PrivateRoute path={profilePath} component={EditProfile} />
        <Route path={newArticlePath} component={CreateArticleItem} />
        <Route
          path={newArticleEditPath}
          render={({ match }) => {
            const { slug } = match.params;
            return <EditArticle slugEdit={slug} />;
          }}
        />
      </BrowserRouter>
    </div>
  );
}

App.defaultProps = {
  getUserData: () => {},
  auth: () => {},
};

App.propTypes = {
  getUserData: PropTypes.func,
  auth: PropTypes.func,
};

export default connect(null, actions)(App);
