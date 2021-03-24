import { NEW_ARTICLE } from '../types';

const newArticle = (state = [], actions) => {
  switch (actions.type) {
    case NEW_ARTICLE:
      return [actions.title, actions.shortDescr, actions.text];
    default:
      return state;
  }
};

export default newArticle;
