import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as movieActions from '../../actions/movies';
import PageTopper from 'components/PageTopper';
import Spinner from 'components/Spinner';
import Poster from "../../components/Poster";

@connect(
    state => ({
        movies: state.movies,
    }),
    dispatch => ({
        movieActions: bindActionCreators(movieActions, dispatch)
    })
)
export default class Movies extends Component {
    componentWillMount() {
        const type = this.props.movies.type;
        const query = this.props.movies.query;
        if(query) {
            this.props.movieActions.filterMovies('search',query);
        }else if(type) {
            this.props.movieActions.filterMovies(type);
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.type !== "search"){
            if(this.props.type !== nextProps.type) {
                this.props.movieActions.filterMovies(type);
            }
        } else {
            if (this.props.query !== nextProps.query) {
                // We call an internal method that starts an animation for our loading icon.
                this.props.movieActions.filterMovies('search',nextProps.query);
            }
        }
    }
    render() {
        const {
            movies,
            query,
            type,
            loaded,
            loading
        } = this.props.movies;

        const moviesData = movies
        let k = moviesData[type].results.length
        let text=''
        switch(type){
            case 'popular':
                text = 'Popular Movies'
                break
            case 'trending':
                text = 'Trending Movies'
                break
            case 'search':
                text = `Searching for ${query}`
                break
            default:
                break;
        }
        return (
            <main className="search">
                <div>
                    <PageTopper title={text} />
                    {query ?
                        <div className="container--lg">
                            <p>Searching for <span>"{query}"</span></p>
                        </div>
                    :null
                    }
                    <div className="container--lg container--poster">
                        {
                            loaded && moviesData[type]['results'].length > 0 ? moviesData[type]['results'].map((result, i) => (
                                <Poster item={result} actions={true} key={i} />
                            )) : loaded && moviesData[type]['results'].length === 0 ? (
                                <p>No results</p>
                            ) : loading ? (
                                <div className="loading">
                                    <Spinner size="large" />
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </main>
        );
    }
}
