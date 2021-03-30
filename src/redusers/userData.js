import { USER_DATA } from '../types';

const userDataReduser = (state = [], actions) => {
  switch (actions.type) {
    case USER_DATA:
      return {
        ...state,
        name: actions.name,
        image: actions.image,
      };
    default:
      return state;
  }
};

export default userDataReduser;
