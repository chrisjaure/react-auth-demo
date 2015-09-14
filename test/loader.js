import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import Loader from '../src/components/loader';

function setup(props) {
    let el = React.createElement(Loader, props);
    ReactDOM.render(el, document.getElementById('render'));
    return document.getElementById('render').querySelector('.loader');
}

test('render empty span if not loading', (t) => {
    t.plan(1);
    let domNode = setup({ loading: false });
    t.notOk(domNode, 'empty');
});

test('render loader if loading', (t) => {
    t.plan(1);
    let domNode = setup({ loading: true });
    t.ok(domNode, 'empty');
});
