import { combineReducers } from 'redux';
import { reducer as sweetalert } from 'react-redux-sweetalert';

import auth from './auth';
import config from './config';
import movie from './movie';
import person from './person';
import movies from './movies';

/**
 * http://redux.js.org/docs/api/combineReducers.html
 */
const rootReducer = combineReducers({
    sweetalert,
    auth,
    config,
    movie,
    person,
    movies,
});

export default rootReducer;
