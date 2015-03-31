//detail page module
var express = require('express');
var app = module.exports = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/thread/:id?', function (req, res) {
    var id = req.params.id;
    var request = require('request');
    var url = "https://webhose.io/search?token=bc4fe82b-0fad-4b9f-b529-8194b68bb07e&format=json$size=0&q=thread.title%3A(" + id + ")";
    console.log(url)
    var results ;
    // request module is used to process the yql url and return the results in JSON format
    request(url, function(err, resp, body) {
        if(body){
            var body = JSON.parse(body);
            if(body.posts){
                results = body.posts;
            }
            //res.send(results)
            // pass back the results
            res.render('template',{results: results})
        }else if(err){
            results = 'There was an error';
            res.send(results)
        }

    });



});