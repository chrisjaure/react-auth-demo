import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import {appBootstrap} from '../src/components/app';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';

function setup(mock, props = {}, children = []) {
    let App = appBootstrap(mock);
    let el = React.createElement(App, props, children);
    let component = renderIntoDocument(el);
    return {domNode: ReactDOM.findDOMNode(component), component};
}

test('get current user on startup', (t) => {
    t.plan(1);
    let authUserMock = {
        getUser: () => {
            t.pass('called get user');
        }
    };
    setup(authUserMock);
});

test('listen for user changes', (t) => {
    t.plan(1);
    let authUserMock = {
        getUser: () => {}
    };
    setup(authUserMock);
    t.ok(authUserMock.onChange, 'set onChange fn');
});

test('show logout link when user is set', (t) => {
    t.plan(1);
    let authUserMock = {
        getUser: () => {}
    };
    let {domNode} = setup(authUserMock);
    authUserMock.onChange({ username: 'test' });
    let logout = domNode.querySelector('.logout');
    t.ok(logout, 'logout link available');
});

test('call user auth and go to login on logout', (t) => {
    t.plan(2);
    let authUserMock = {
        getUser: () => {},
        logout: () => {
            t.pass('logout called');
        }
    };
    let history = {
        pushState: (path, query) => {
            t.equal(query, '/login', 'pushState called');
        }
    }
    let {domNode} = setup(authUserMock, {history});
    authUserMock.onChange({ username: 'test' });
    let logout = domNode.querySelector('.logout');
    Simulate.click(logout);
});

test('redirect to home page on login', (t) => {
    t.plan(2);
    let authUserMock = {
        getUser: () => {},
        login: () => {
            t.pass('login called');
            return Promise.resolve();
        }
    };
    let history = {
        replaceState: (path, query) => {
            t.equal(query, '/', 'replaceState called');
        }
    }
    let {component} = setup(authUserMock, {history});
    component.login();
});
