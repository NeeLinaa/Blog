import React from 'react';
import Header from '../header/Header';
import ArticleList from '../article-list/ArticleList';
import ArticleDetails from '../article-details/ArticleDetails';
import CreateNewAcc from '../forma-create-new-acc/CreateNewAcc';
import EditProfile from '../forma-edit-profile/EditProfile';
import SignIn from '../forma-sign-in/SignIn';

import { BrowserRouter, Route } from 'react-router-dom';

import './App.scss';

function App() {

  return (
    <div className='container'>
      <BrowserRouter>
        <Route path='/' component={Header} />
        <Route path='/' exact component={ArticleList} />
        <Route path='/articles/:slug'
               render={({match}) => {
                 const { slug } = match.params
                 return <ArticleDetails slug={slug} />
               }} 
               />
        <Route path='/sign-in' render={() => (
                <SignIn />
               )} />
        <Route path='/sign-up' render={() => (
                <CreateNewAcc />
               )} />
        <Route path='/profile' component={EditProfile} />
      </BrowserRouter>
     </div>
  );
}

export default App;
