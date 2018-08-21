import moment from 'moment';
const tmdb_api_key = '67265207de2e82c26fd875e03b40c17d';

import api from 'helpers/api';
import { loadImages} from '../helpers/image';
import qwest from "qwest";

export const MOVIE_LOADED = 'movie/movie';
export const MOVIE_LOADING = 'movie/movie_loading';

export function load(trakt_id) {
    return dispatch => {
        dispatch({ type: MOVIE_LOADING });

        return api.client.movies.summary({
                id: trakt_id,
                extended: 'full'
            })
            .then(movie => {
                const item = {
                    movie: movie,
                    itemType: 'movie'
                };

                return loadImages(item)
                    .then(tmdb => {
                        item.movie.poster_path = tmdb.poster_path;
                        item.movie.backdrop_path = tmdb.backdrop_path;
                        return item;
                    })
                    .catch(() => item);
            })
            .then(item => {
                return api.client.movies.stats({
                        id: trakt_id
                    })
                    .then(stats => {
                        item.movie.stats = stats;
                        return item;
                    })
                    .catch(() => item)
            })
            .then(item => {
                return api.client.movies.people({
                        id: trakt_id
                    })
                    .then(stats => {
                        item.movie.people = stats;
                        return item;
                    })
                    .catch(() => item)
            })
            .then(item => {
                return crewProcessor(item.movie.people.cast)
                    .then(tmdbShow => {
                        item.movie.people.cast = tmdbShow;
                        return item;
                    })
                    .catch(() => item);
            })
            .then(payload => dispatch({ type: MOVIE_LOADED, payload }));
    };
}
export const crewProcessor=((results)=> Promise.all(results.slice(1,5).map(item => {
    if(item['person']['ids']['tmdb']) {
        return loadImagesPeople(item['person'])
            .then(tmdbShow => {
                item['itemType'] = 'person';
                item['person'] = tmdbShow;
                return item;
            })
            .catch(() => item);
    }
    return item;
})));
export const loadImagesPeople = (item) => {
    if(item.ids.tmdb) {
        return qwest.get(`https://api.themoviedb.org/3/person/${item.ids.tmdb}`, {
            api_key: tmdb_api_key,
            language: 'en-US'
        }, {
            cache: true
        })
        .then((xhr, tmdbShow) => {
            item.poster_path =  `https://image.tmdb.org/t/p/w300_and_h450_bestv2${tmdbShow.profile_path}`
            return item;
        })
        .catch(() => ({}));
    }
    return Promise.resolve({});
};
