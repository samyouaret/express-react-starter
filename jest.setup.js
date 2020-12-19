require('dotenv').config({ debug: false });
// to ignore error encoding not recognized
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const Application = require('./app/Application');
const {encode,decode} = require('querystring');

const app = new Application();
global.request = request;
global.app = app;
global.urlencode = encode;
global.urldecode = decode;
jest.setTimeout(60000); // in milliseconds