import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tooltip from 'rc-tooltip';
import moment from 'moment';
import classNames from 'classnames';

import * as personActions from '../../actions/person';
import PageTopper from '../PageTopper';
import Spinner from 'components/Spinner';
import { formatNumber } from 'helpers/number';

import './styles';
import Poster from "../Poster";
import route from "../../helpers/route";
import Link from "react-router/es/Link";

@connect(
    state => {
        debugger
        return {
            person: state.person
    }},
    dispatch => ({
        personActions: bindActionCreators(personActions, dispatch)
    })
)
export default class Person extends Component {
    componentWillMount() {
        const person = this.props.person;
        const title = this.props.params.title;
        const id = this.props.params.id;
        debugger
        this.props.personActions.load(id);
    }
    render() {
        const title = decodeURIComponent(this.props.params.title).replace(/-/g, ' ');
        debugger
        const person = this.props.person;
        const item = person.item;
        debugger
        return (
            <main className="show">
                <PageTopper item={item}>
                    <div className="container">
                        <h2>
                            <span dangerouslySetInnerHTML={{__html: item ? item.person.name : title }} />
                        </h2>
                        </div>
                </PageTopper>
                <div className="show-main">
                    {item ? (
                        <div className="container">
                            <aside className="sidebar">
                                <Poster item={item} titles={false} />
                                <section className="facts">
                                    <h3 className="space"><bdi>Personal Info</bdi></h3>
                                    <p><strong><bdi>Birthday</bdi></strong>{item.person.birthday}</p>
                                    <p><strong><bdi>Birtplace</bdi></strong>{item.person.birthplace}</p>
                                </section>
                            </aside>
                            <div className="show-content">
                                <section className="overview">
                                    <h3>Biography</h3>
                                    <br/>
                                    <div className="content" style={{'width':'100%'}}>
                                        <p>{item.person.biography}</p>
                                        <div className="container--lg container--poster">
                                            {
                                                item.person.movies && item.person.movies['cast'].length > 0
                                                ?
                                                    item.person.movies['cast'].map((result, i) => (
                                                        <Poster item={result} actions={true} key={i} />
                                                    ))
                                                : item.person.movies && item.person.movies['cast'].length  === 0
                                                    ? (<p>No Movies results</p>)
                                                    : null
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
