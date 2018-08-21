import moment from 'moment';

import api from 'helpers/api';
import { loadImages } from '../helpers/image';

export const MOVIES_POPULAR = 'popular';

export const MOVIES_LOADED = 'movies_loaded';
export const MOVIES_LOADING = 'movies_loading';
export const SEARCH_LOADING = 'search/search_loading'

export function filterMovies(type = MOVIES_POPULAR, query='') {
    return (dispatch, getState) => {
        dispatch({
            type: MOVIES_LOADING,
            payload:{
                type,
                query
            }
        });
        return fireAPICorrect(type,query)
            .then((results)=>movieListProcessor(type,  results))
            .then(results => dispatch({ type: MOVIES_LOADED, payload:{type,results}}));
    };
}
export const movieListProcessor=((type='',results)=> Promise.all(results.map(result => {
    const item = {
        movie: type !== 'popular' ? result.movie : result,
        itemType: 'movie'
    };
    if(item[item.itemType]['ids']['tmdb']) {
        return loadImages(item)
            .then(tmdbShow => {
                item['movie'].poster_path = tmdbShow.poster_path;
                item['movie'].backdrop_path = tmdbShow.backdrop_path;
                return item;
            })
            .catch(() => item);
    }
    return item;
})));
export const fireAPICorrect=(type,query='')=>{
    if(type==='popular'){
        return api.client.movies.popular()
    }else if(type==='trending'){
        return api.client.movies.trending()
    }else if(type==='search'){
        return api.client.search.text({
            'type':'movie',
            query
        })
    }
}
