import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import classNames from 'classnames';

import route from 'helpers/route';

import './styles';

export default class Poster extends React.PureComponent {
    render() {
        const {
            item,
        } = this.props;
        let mainLink =''
        debugger
        if(item.itemType === 'movie'){
            mainLink = route('movies.single', { title: item[item.itemType].ids.slug });
        }else if(item.itemType === 'person'){
            // mainLink = route('people.single', { title: item[item.itemType].id, id: item[item.itemType].trakt});
            mainLink = route('people.single', { title: item[item.itemType].name, id:item[item.itemType]['ids'].trakt});
        }
        let itemTitle = ''
        if(item.itemType === 'person'){
            itemTitle = item[item.itemType].name
        }else{
            itemTitle = item[item.itemType].title;
        }
        const posterPath = item[item.itemType].poster_path;
        // const classN =
        return (
            <div className={classNames('poster')}>
                <div className="poster__images">
                    <Link to={mainLink}>
                        <img src="/img/poster.png" alt="Temporary Poster" className="base" />
                        {posterPath ? (
                            <img src={posterPath} alt="Poster" className="real" />
                        ) : null}
                    </Link>
                </div>
                <div className="poster__titles">
                    <p className={classNames('titles__show','titles--single')} title={itemTitle}>
                        <Link to={mainLink} dangerouslySetInnerHTML={{__html: itemTitle }} style={{'color':item.itemType==='movie' ? 'white' :'black'}}/>
                    </p>
                </div>
            </div>
        );
    }
}
