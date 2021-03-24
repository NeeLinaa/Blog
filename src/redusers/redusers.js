import { combineReducers } from 'redux';
import allArticlesReduser from './allArticlesReduser';
import formReduser from './formReduser';
import authorDataReduser from './authorDataReduser';
import newArticleReduser from './newArticleReduser';

const allRedusers = combineReducers({
  articles: allArticlesReduser,
  form: formReduser,
  authorData: authorDataReduser,
  newArticle: newArticleReduser,
});

export default allRedusers;
