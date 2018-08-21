import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';

import './styles';

const background = '/img/poster-bg.jpg'
@connect(
    state => ({}),
    dispatch => ({})
)
export default class PageTopper extends React.PureComponent{
    render() {
        const {
            children,
            item,
            title,
        } = this.props;

        let topperItem = item;

        let link = null;
        let itemTitle = null;
        let itemBackdrop = null;

        if(topperItem) {
            if(topperItem.itemType === 'movie') {
                link = `/movies/${topperItem.movie.ids.slug}`;
                itemTitle = topperItem.movie.title;
            } else if(topperItem.itemType    === 'person') {
                link = `/person/${topperItem.person.ids.slug}`;
                itemTitle = topperItem.person.title;
            }
            itemBackdrop = topperItem[topperItem.itemType].backdrop_path;
        }

        const defaultBackdrop = (<div className={classNames('page-topper__bg', 'repeat blur')} style={{backgroundImage: `url(${background})`}}/>);

        return (
            <div className={classNames('page-topper', {
                    'page-topper--banner': topperItem
                })}>
                <div>
                {topperItem
                    ? (itemBackdrop
                        ? (<div className="page-topper__bg" style={{backgroundImage: `url(${itemBackdrop})`}} />)
                        : defaultBackdrop)
                    : (defaultBackdrop)
                }
                {title
                    ? (<h2>{title}</h2>)
                    : null
                }
                {children}
                </div>
            </div>
        );
    }
}
