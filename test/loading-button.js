import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import LoadingButton from '../src/components/loading-button';
import {renderIntoDocument, findRenderedDOMComponentWithTag, Simulate} from 'react-addons-test-utils';

function setup(props) {
    let el = React.createElement(LoadingButton, props);
    let tree = renderIntoDocument(el);
    return ReactDOM.findDOMNode(tree);
}

test('handle hover styles', (t) => {
    t.plan(2);
    let domNode = setup({ loading: false });
    let bgColor = domNode.style.backgroundColor;
    Simulate.mouseEnter(domNode);
    t.notEqual(bgColor, domNode.style.backgroundColor, 'background changed');
    Simulate.mouseLeave(domNode);
    t.equal(bgColor, domNode.style.backgroundColor, 'background changed back');
});

test('add loading styles', (t) => {
    t.plan(1);
    let domNode = setup({ loading: false });
    let styles = domNode.style;
    let domNodeLoading = setup({ loading: true });
    t.notDeepEqual(styles, domNodeLoading, 'styles changed');
});
