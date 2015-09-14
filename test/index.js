/* global global, require */
import jsdom from 'jsdom';
global.document = jsdom.jsdom('<!doctype html><html><meta charset=utf-8><title>test doc</title><div id="render"></div>');
global.window = document.defaultView;
global.navigator = {
   userAgent: 'node.js'
};

// run all the tests!
// need to require so jsdom polyfills are in place

require('./user-auth');
require('./login');
require('./loading-button');
require('./loader');
require('./app');
