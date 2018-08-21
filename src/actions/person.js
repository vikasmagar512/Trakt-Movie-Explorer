import moment from 'moment';
const tmdb_api_key = '67265207de2e82c26fd875e03b40c17d';

import api from 'helpers/api';
import {loadImages} from '../helpers/image';
import qwest from "qwest";
import {loadImagesPeople} from "./movie";
import {movieListProcessor} from "./movies";


export const PERSON_LOADED = 'person/movie';
export const PERSON_LOADING = 'person/person_loading';

export function load(trakt_id) {
    return dispatch => {
        dispatch({ type: PERSON_LOADING });

        return api.client.people.summary({
                id: trakt_id,
                extended: 'full'
            })
            .then(person => {
                const item = {
                    person: person,
                    itemType: 'person'
                };
                if(item['person']['ids']['tmdb']) {
                    return loadImagesPeople(item['person'])
                        .then(tmdbShow => {
                            item['person'] = tmdbShow;
                            return item;
                        })
                        .catch(() => item);
                }
                return item
            })
            .then(item => {
                return api.client.people.movies({
                    id: trakt_id
                })
                    .then(movies => {
                        item['person'].movies = movies;
                        return item;
                    })
                    .catch(() => item)
            })
            .then(item => {
                return item.person.movies.cast && item.person.movies.cast.length
                    ?
                    movieListProcessor('',item.person.movies.cast)
                    .then(tmdbShow => {
                        item.person.movies.cast = tmdbShow;
                        return item;
                    })
                    .catch(() => item)
                :   item
            })
            .then(payload => dispatch({ type: PERSON_LOADED, payload }));
    };
}
