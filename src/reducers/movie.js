import {
    MOVIE_LOADING,
    MOVIE_LOADED,
} from '../actions/movie';
const initialState = {
    loading: false,
    loaded: true,
    item: null,
};

export default function movie(state = initialState, action = {}) {
    switch(action.type) {
        case MOVIE_LOADING:
            return initialState;
        case MOVIE_LOADED:
            return {
                ...state,
                loading: false,
                loaded: true,
                item: action.payload
            };
        default:
            return state;
    }
}
