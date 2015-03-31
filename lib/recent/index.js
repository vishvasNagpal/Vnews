//fatches recent news for the first load and get the search results

var express = require('express');
var app = module.exports = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/recent/:id?', function (req, res) {
    var scrolling = false;
    var nextUrl = "/search?token=bc4fe82b-0fad-4b9f-b529-8194b68bb07e&format=json&q=india";

    //Webhose parameters for fatching next 20 results on scroll
    var ts = '';
    var que = '';
    if(req.query.ts){
        ts = '&ts=' + req.query.ts;
        q = '&q=' + req.query.q;
        //que = '&q=india';
        nextUrl = '/search?token=bc4fe82b-0fad-4b9f-b529-8194b68bb07e&format=json' + ts + q;
        scrolling = true; // if true then changes the tempalate for scrolling results
    }

    //search url formation
    if(req.query.searchQuery){
        q = '&q=' + req.query.searchQuery;
        nextUrl = '/search?token=bc4fe82b-0fad-4b9f-b529-8194b68bb07e&format=json' + q;
    }
    var baseUrl = 'https://webhose.io';
    var size = '&size=20';
    var request = require('request');

    var url = baseUrl + nextUrl + size;

    var results ;
    // request module is used to process the url and return the results in JSON format
    request(url, function(err, resp, body) {
        if(body){
            var body = JSON.parse(body);
            if(body.posts){
                results = body.posts;
            }
            //res.send(body)
            var template = 'template';
            if(scrolling){
                template = 'scrollTemplate'; // template for scroll results
            }

            // pass back the results
            res.render(template,{results: results, next: body.next});
            scrolling = false
        }else if(err){
            results = 'There was an error';

        }
    });
});