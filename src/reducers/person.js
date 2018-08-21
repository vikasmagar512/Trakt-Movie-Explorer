import {
    PERSON_LOADING,
    PERSON_LOADED,
} from '../actions/person';

const initialState = {
    loading: false,
    loaded: true,
    item: null,
};

export default function person(state = initialState, action = {}) {
    switch(action.type) {
        case PERSON_LOADING:
            return initialState;
        case PERSON_LOADED:
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
