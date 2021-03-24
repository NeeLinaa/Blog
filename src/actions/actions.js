import {
  GET_ALL_ARTICLES,
  GET_USER_DATA,
  AUTH_FLAG,
  EDIT_PROFILE_FLAG,
  ARTICLE_AUTHOR_DATA,
  NEW_ARTICLE,
} from '../types';

export const getAllArticles = (arr) => ({ type: GET_ALL_ARTICLES, arr, loading: true });

export const auth = (authFlag) => ({ type: AUTH_FLAG, authFlag });

export const editProfile = (editProfileFlag) => ({ type: EDIT_PROFILE_FLAG, editProfileFlag });

export const getUserData = (name, image) => ({ type: GET_USER_DATA, name, image });

export const getArticleAuthorData = (name, image, date) => ({ type: ARTICLE_AUTHOR_DATA, name, image, date });

export const createNewArticle = (title, shortDescr, text) => ({ type: NEW_ARTICLE, title, shortDescr, text });
