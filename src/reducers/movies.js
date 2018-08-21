import {
    MOVIES_LOADING,
    MOVIES_LOADED,
    SEARCH_LOADING
} from '../actions/movies';

const types=['search','popular','trending']
const initialState = {
    loading: false,
    loaded: false,
    type: 'popular',
    query: null,
    movies:{
        'search':{
            results:[],
        },
        'popular':{
            results:[],
        },
        'trending':{
            results:[],
        },
    }
};

export default function movies(state = initialState, action = {}) {
    switch(action.type) {
        case SEARCH_LOADING:
            return {
                ...state,
                loading: true,
                loaded: false,
                query: action.payload.query,
                type: action.payload.type,
                movies:{
                    ...state.movies,
                    [action.payload.type]:{
                        ...state.movies[action.type],
                        results:[]
                    }
                }
            };
        case MOVIES_LOADING:
            return {
                ...state,
                loading: true,
                loaded: false,
                type: action.payload.type,
                query: action.payload.query,
                movies:{
                    ...state.movies,
                    [action.payload.type]:{
                        ...state.movies[action.payload.type],
                        results:[]
                    }
                }
            };
        case MOVIES_LOADED:
            return {
                ...state,
                loading: false,
                loaded: true,
                movies:{
                    ...state.movies,
                    [state.type]:{
                        ...state.movies[state.type],
                        results:action.payload.results
                    }
                }
            }
        default:
            return state;
    }
}
