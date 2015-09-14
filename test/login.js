import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../src/components/login';
import {renderIntoDocument, findRenderedDOMComponentWithTag, Simulate} from 'react-addons-test-utils';

function setup(props) {
    let el = React.createElement(Login, props);
    let tree = renderIntoDocument(el);
    return ReactDOM.findDOMNode(tree);
}

test('show error', (t) => {
    t.plan(1);
    let domNode = setup({login: () => Promise.reject(new Error('error'))});
    Simulate.submit(domNode.querySelector('form'));
    setTimeout(function () {
        t.equal(domNode.querySelector('.error').textContent, 'error', 'element contains correct message');
    }, 0);
});

test('submit user input', (t) => {
    t.plan(1);
    let login = function (user) {
        t.deepEqual(user, {username: 'test', password: 'test'}, 'correct object');
        return Promise.resolve();
    }
    let domNode = setup({login});
    let inputs = domNode.querySelectorAll('input');
    inputs[0].value = 'test';
    inputs[1].value = 'test'
    Simulate.change(inputs[0]);
    Simulate.change(inputs[1]);
    Simulate.submit(domNode.querySelector('form'));
});
