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

// test('handle hover styles', (t) => {
//     let domNode = setup({ loading: false });
//     let button = domNode.querySelector('button');
//     console.log(button.styles);
// });
