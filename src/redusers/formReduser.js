import { GET_USER_DATA, AUTH_FLAG, EDIT_PROFILE_FLAG } from '../types';

const formReduser = (state = {}, actions) => {
    switch (actions.type) {
        case GET_USER_DATA:
            return {
                ...state,
                name: actions.name,
                image: actions.image
            }
        case AUTH_FLAG:
            return {
                ...state,
                authFlag: actions.authFlag
            }
        case EDIT_PROFILE_FLAG:
            return {
                ...state,
                editProfileFlag: actions.editProfileFlag
            }
        default:
            return state;
    }
}

export default formReduser;