import React from 'react'; // eslint-disable-line no-unused-vars
import { Router, Route, IndexRoute } from 'react-router';
import {appBootstrap} from './app';
import Login from './login';
import Greeting from './greeting';
import createUserAuth from '../api/user-auth';
const userAuth = createUserAuth(sessionStorage)
const App = appBootstrap(userAuth);

export default (props) => (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Greeting} onEnter={userAuth.requireAuthentication.bind(userAuth)} />
            <Route path="login" component={Login} />
        </Route>
    </Router>
);
