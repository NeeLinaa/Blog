import { GET_ALL_ARTICLES, USER_DATA, AUTH_FLAG, EDIT_PROFILE_FLAG, ARTICLE_AUTHOR_DATA, NEW_ARTICLE } from '../types';

export const getAllArticles = (arr) => (dispatch) => dispatch({ type: GET_ALL_ARTICLES, arr });

export const auth = (authFlag) => ({ type: AUTH_FLAG, authFlag });

export const editProfile = (editProfileFlag) => ({ type: EDIT_PROFILE_FLAG, editProfileFlag });

export const getUserData = (name, image) => (dispatch) => dispatch({ type: USER_DATA, name, image });

export const getArticleAuthorData = (name, image, date) => (dispatch) =>
  dispatch({ type: ARTICLE_AUTHOR_DATA, name, image, date });

export const createNewArticle = (title, shortDescr, text) => (dispatch) =>
  dispatch({ type: NEW_ARTICLE, title, shortDescr, text });
