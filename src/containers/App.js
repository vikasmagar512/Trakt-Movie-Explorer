import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as configActions from 'actions/config';
import Navbar from 'components/Navbar';
import Spinner from 'components/Spinner';

import 'app.scss';

@connect(
    state => ({
        config: state.config,
    }),
    dispatch => ({
        configActions: bindActionCreators(configActions, dispatch),
    })
)
export default class App extends Component {
    componentWillMount() {
        const config = this.props.config;
        if(!config.loaded || config.failed) {
            this.props.configActions.load();
        }
    }


    render() {
        const {
            children,
            config,
        } = this.props;

        if(!config.loaded) {
            return (
                <div className="container container--app-load">
                    <Spinner size="large" />
                </div>
            );
        }

        if(config.failed) {
            return (
                <div className="container container--app-load">
                    <p className="error">Failed to load <code>config.json</code></p>
                </div>
            );
        }

        return (
            <div className={classNames('cinematic-lighting')}>
                <Navbar/>
                {children}
            </div>
        );
    }
}
