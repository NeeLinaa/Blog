import { AUTH_FLAG, EDIT_PROFILE_FLAG } from '../types';

const formReduser = (state = {}, actions) => {
  switch (actions.type) {
    case AUTH_FLAG:
      return {
        ...state,
        authFlag: actions.authFlag,
      };
    case EDIT_PROFILE_FLAG:
      return {
        ...state,
        editProfileFlag: actions.editProfileFlag,
      };
    default:
      return state;
  }
};

export default formReduser;
