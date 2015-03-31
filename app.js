/**
 * Created by vish on 3/29/2015.
 */

var express = require('express');
var app = module.exports = express();

var recent = require('./lib/recent');
var thread = require('./lib/thread');

app.use(recent);
app.use(thread);
app.use('/public', express.static(__dirname + '/public'));

app.listen(3000);
console.log('app started');

