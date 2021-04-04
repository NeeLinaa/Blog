import { GET_ALL_ARTICLES } from '../types';

const allArticlesReduser = (state = {}, actions) => {
  switch (actions.type) {
    case GET_ALL_ARTICLES:
      return {
        ...state,
        articlesArr: actions.arr,
      };
    default:
      return state;
  }
};

export default allArticlesReduser;
