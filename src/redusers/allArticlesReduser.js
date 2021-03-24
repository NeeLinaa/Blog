import { GET_ALL_ARTICLES } from '../types';

const allArticlesReduser = (state = [], actions) => {
  switch (actions.type) {
    case GET_ALL_ARTICLES:
      return [actions.arr, actions.loading];
    default:
      return state;
  }
};

export default allArticlesReduser;
