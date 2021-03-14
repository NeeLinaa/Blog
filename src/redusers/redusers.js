import { combineReducers } from 'redux';
import allArticlesReduser from './allArticlesReduser';
import formReduser from './formReduser';
import authorDataReduser from './authorDataReduser'

const allRedusers = combineReducers({
    articles: allArticlesReduser,
    form: formReduser,
    authorData: authorDataReduser
})

export default allRedusers;