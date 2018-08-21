import React from 'react';
import { IndexRoute, Route } from 'react-router';

import {
    App,
    Auth,
    Deck,
    Search,
    Movie,
    OAuthCallback
} from 'containers';
import Movies from "./containers/Movies";
import People from "./components/People";

export const schema = {
    'home': '/',
    'search': '/search',
    'popular': '/popular',
    'trending': '/trending',
    'movies.single': '/movies/{title}',
    'people.single': '/people/{title}/{id}',
    'oauth.callback': '/oauth/callback'
};

export default (store) => {
    return (
        <Route component={App}>
            <Route component={Auth}>
                <Route path="/" component={Movies}/>
                {/*<Route path="/popular" component={Popular} />*/}
                <Route path="/popular" component={Movies} />
                <Route path="/trending" component={Movies} />
                <Route path="/search" component={Movies} />
                <Route path="/movies/:title" component={Movie} />
                <Route path="/people/:title/:id" component={People} />
            </Route>
            <Route path="/oauth/callback" component={OAuthCallback} />
        </Route>
    );
};
