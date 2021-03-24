import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../header/Header';
import ArticleList from '../article-list/ArticleList';
import ArticleDetails from '../article-details/ArticleDetails';
import CreateNewAcc from '../forma-create-new-acc/CreateNewAcc';
import EditProfile from '../forma-edit-profile/EditProfile';
import SignIn from '../forma-sign-in/SignIn';
import CreateArticleItem from '../create-article-item/CreateArticleItem';
import EditArticle from '../edit-article/EditArticle';

import './App.scss';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Route path="/articles" exact component={ArticleList} />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params;
            return <ArticleDetails slugProp={slug} />;
          }}
        />
        <Route path="/sign-in" render={() => <SignIn />} />
        <Route path="/sign-up" render={() => <CreateNewAcc />} />
        <Route path="/profile" component={EditProfile} />
        <Route path="/new-article" component={CreateArticleItem} />
        <Route
          path="/articles/:slug/edit"
          render={({ match }) => {
            const { slug } = match.params;
            return <EditArticle slugEdit={slug} />;
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
