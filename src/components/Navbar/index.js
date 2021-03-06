import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import classNames from 'classnames';

import * as authActions from '../../actions/auth';
import * as movieActions from '../../actions/movies';
import Dropdown, { Menu, Item, Divider } from 'components/Dropdown';
import Button from '../Button';
import Icon from '../Icon';
import route from '../../helpers/route';

import './styles';

@connect(
    state => ({
        auth: state.auth,
    }),
    dispatch => ({
        authActions: bindActionCreators(authActions, dispatch),
        movieActions: bindActionCreators(movieActions, dispatch),
    })
)
export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: false,
            searchValue: ''
        };
    }

    toggleSearch() {
        this.setState({
            search: !this.state.search,
            searchValue: ''
        }, () => {
            if(this._searchInput && this.state.search) {
                window.setTimeout(() => this._searchInput.focus(), 200);
            }
        });
    }

    closeSearch() {
        this.setState({
            search: false,
            searchValue: ''
        });
    }

    handleSearchChange(e) {
        this.setState({
            searchValue: e.target.value
        });
    }

    handleSearchKey(e) {
        if(e.keyCode === 27) { // ESC
            this.closeSearch();
        } else if(e.keyCode === 13) { // Enter
            const query = e.target.value;
            if(query.length > 0) {
                this.closeSearch();
                this.props.movieActions.filterMovies('search',query)
                browserHistory.push(route('search', {}, {
                    query: encodeURIComponent(query).replace(/%20/g, '+')
                }));
            }
        }
    }
    logout() {
        this.props.authActions.logout();
    }
    filterMovies(type){
        debugger
        this.props.movieActions.filterMovies(type)
        browserHistory.push(route('popular', {}, {}));
    }

    render() {
        const { isAuthenticated, errorMessage } = this.props

        const {
            auth
        } = this.props;

        const {
            search
        } = this.state;

        return (
            <header className="navbar">
                <Link
                    to={route('home')}
                    className="logo">
                    <img src="/img/logo.svg" alt="Trakt.tv" />
                    <div className="bottom-wrapper">
                        <div className="bottom" />
                    </div>
                </Link>
                {auth.user ? (
                    <div>
                        <ul className="nav nav--left">
                            <li><Link
                                // to={route("trending")}
                                to={route('home')}
                                activeClassName="active"
                                onClick={this.filterMovies.bind(this,'trending')}>
                                Trending
                            </Link></li>
                        </ul>
                        <ul className="nav nav--right">
                            <li><Link
                                to={route("popular")}
                                activeClassName="active"
                                onClick={this.filterMovies.bind(this,'popular')}>
                                Popular
                            </Link></li>
                        </ul>
                        <div className="nav nav--last">
                            <div className="user">
                                <Dropdown
                                    dark={true}
                                    menu={(
                                        <Menu placement="right">
                                            <Item link={true}>
                                                <a href={`https://trakt.tv/users/${auth.user.username}`} target="_blank" rel="noopener">Profile</a>
                                            </Item>
                                            <Item link={true}>
                                                <a href={`https://trakt.tv/users/${auth.user.username}/history`} target="_blank" rel="noopener">History</a>
                                            </Item>
                                            <Item link={true}>
                                                <a href={`https://trakt.tv/users/${auth.user.username}/lists`} target="_blank" rel="noopener">Lists</a>
                                            </Item>
                                            <Item link={true}>
                                                <a href="https://trakt.tv/settings/hidden" target="_blank" rel="noopener">Hidden Items</a>
                                            </Item>
                                            <Item link={true}>
                                                <a href="https://trakt.tv/settings" target="_blank" rel="noopener">Settings</a>
                                            </Item>
                                            <Divider />
                                            <Item onClick={this.logout.bind(this)}>Sign out</Item>
                                        </Menu>
                                    )}>
                                    <Button type="default">
                                        <img src={auth.user.images.avatar.full} className="avatar" alt={auth.user.name} />
                                        <span>{auth.user.name}</span>
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>
                        <ul className="nav nav--first">
                            <li
                                className={classNames('search', {
                                    'active': search
                                })}>
                                <button onClick={this.toggleSearch.bind(this)}>
                                    <Icon name={search ? "times" : "search"} />
                                </button>
                                <div className="search__input">
                                    <input
                                        type="text"
                                        ref={c => this._searchInput = c}
                                        onChange={this.handleSearchChange.bind(this)}
                                        onKeyUp={this.handleSearchKey.bind(this)}
                                        value={this.state.searchValue}
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                ) : null}
            </header>
        );
    }
}
