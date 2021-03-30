import { combineReducers } from 'redux';
import allArticlesReduser from './allArticlesReduser';
import formReduser from './formReduser';
import authorDataReduser from './authorDataReduser';
import userDataReduser from './userData';

const allRedusers = combineReducers({
  articles: allArticlesReduser,
  form: formReduser,
  authorData: authorDataReduser,
  userData: userDataReduser,
});

export default allRedusers;
