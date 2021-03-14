import { ARTICLE_AUTHOR_DATA } from '../types'

const authorDataReduser = (state = [], actions) => {
    switch (actions.type) {
        case ARTICLE_AUTHOR_DATA:
            return [actions.name, actions.image, actions.date]
        default: 
            return state;
    }
}

export default authorDataReduser;