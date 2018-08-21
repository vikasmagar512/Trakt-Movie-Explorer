import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tooltip from 'rc-tooltip';
import moment from 'moment';
import classNames from 'classnames';

import * as movieActions from '../../actions/movie';
import PageTopper from 'components/PageTopper';
import Spinner from 'components/Spinner';
import Icon from 'components/Icon';
import { formatNumber } from 'helpers/number';

import './styles';
import route from "../../helpers/route";
import Link from "react-router/es/Link";
import Poster from "../../components/Poster";

@connect(
    state => {
        return {
        movie: state.movie
    }},
    dispatch => ({
        movieActions: bindActionCreators(movieActions, dispatch)
    })
)
export default class Movie extends Component {
    componentWillMount() {
        const movie = this.props.movie;
        const title = this.props.params.title;
        if((!movie.item || title.toLowerCase() !== movie.item[movie.item.itemType].title.toLowerCase()) && movie.loading === false) {
            this.props.movieActions.load(title);
        }
    }

    render() {
        const title = decodeURIComponent(this.props.params.title).replace(/-/g, ' ');
        const movie = this.props.movie;
        const item = movie.item;

        let stats = [];
        if(item && item.movie.stats) {
            stats = [
                { label: 'watchers', value: formatNumber(item.movie.stats.watchers) },
                { label: 'plays', value: formatNumber(item.movie.stats.plays) },
                { label: 'collected', value: formatNumber(item.movie.stats.collectors) },
                { label: 'lists', value: formatNumber(item.movie.stats.lists) }
            ];
        }
        let additional = [];
        if(item) {
            additional = [
                { label: 'Premiered', value: moment(item.movie.first_aired).format('MMM D, YYYY') },
                { label: 'Runtime', value: `${item.movie.runtime} min${item.movie.runtime !== 1 ? 's' : ''}` },
                { label: 'Language', value: item.movie.language },
                { label: 'Genres', value: item.movie.genres.map(genre => genre.upperCaseFirst()).join(', ') }
            ];
        }

        return (
            <main className="show">
                <PageTopper item={item}>
                    <div className="container">
                        <h2>
                            <span dangerouslySetInnerHTML={{__html: item ? item.movie.title : title }} />
                            <span className="year">{item ? item.movie.year : null}</span>
                        </h2>
                        <div className="show__meta">
                            {item && item.movie.rating && item.movie.votes ? (
                                <div className="rating">
                                    <Icon name="heart" />
                                    <span className="heart-solid" />
                                    <p>
                                        {`${Math.round(item.movie.rating * 10)}%`}
                                        <span>{`${item.movie.votes} votes`}</span>
                                    </p>
                                </div>
                            ) : null}
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <p>{stat.value}<span>{stat.label}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageTopper>
                <div className="show-main">
                    {item ? (
                        <div className="container">
                            <aside className="sidebar">
                                <Poster item={item} titles={false} />
                            </aside>
                            <div className="show-content">
                                <section className="overview">
                                    <div className="content" style={{'width':'100%'}}>
                                        <ul className="additional-stats">
                                            {additional.map((stat, i) => (
                                                <li key={i}>
                                                    <label>{stat.label}</label>
                                                    <span>{stat.value}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p>{item.movie.overview}</p>
                                        <div className="container--lg container--poster">
                                            {   item.movie.people.cast.length > 0
                                                ?
                                                    item.movie.people.cast.map((result, i) => (
                                                        <Poster item={result} actions={true} key={i} />
                                                    ))
                                                :
                                                    <p>No Cast Available</p>
                                            }
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </div>
                    ) : (
                        <div className="loading">
                            <Spinner size="large" />
                        </div>
                    )}
                </div>
            </main>
        );
    }
}
