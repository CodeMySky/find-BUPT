
/*
 * GET home page.
 */
var Article = require("../models/article");
var http = require('https');
exports.index = function(req, res){
  if (req.query.expires_in>0)
    res.send(req.query);
  else res.render('index', { title: 'Express' });
};

exports.article = function(req,res){
  var request = req.params.request;
  Article.get(request,function(err,article){
    if (err) res.end(err);
    if (!article) res.end("NO "+request+" FOUND!");
    res.render('article',{a:article});
  });
}

exports.updateArticle = function(req,res){
  var request = req.params.request;
  var article = req.body;
  article.create = new Date();
  article = new Article(article);
  console.log(article);
  article.save(function(err,a){
    console.log(err);
    console.log(a);
    if (err) res.send(err);
    else res.send("success");
  })
}

exports.login = function(req,res) {
  var code = req.query.code;
  if (code){
    var url = 'https://openapi.baidu.com/social/oauth/2.0/token';
    //API Key from developer.baidu.com
    var client_id = 'ulDegcd5YaQZ5tFta5OetWiE';
    //Secret Key from developer.baidu.com
    var client_secret = 'T1fWAVVbkqKAeG5FP8VtLHArs5CuO0hw';
    //social redirect_uri registered in developer.baidu.com
    var redirect_uri = 'http://localhost:3000/login';
    var params = [
            'grant_type' + '='+'authorization_code',
            'client_id'  + '='+ client_id,
            'client_secret'+'='+ client_secret,
            'redirect_uri'+'='+ redirect_uri,
            'code'        +'='+ code,
        ];

    http.get(url+'?'+params.join('&'), function(bres) {
      console.log("Got response: " + bres.statusCode);
      var body = '';
      bres.on('data', function (chunk) {
          body += chunk;
        });
      bres.on('end', function () {
          console.log(body);
          var user = JSON.parse(body);
          res.locals.name = user.name;
          res.redirect('/');
        });
    }).on('error', function(e) {
        console.log("login: " + e.message);
      });
  }
}

exports.all = function(req,res){
  Article.distinct('title',function(err,titles){
    if (err) res.send(err);
    if (titles){
      var all = [];
      var count = 0;
      titles.forEach(function(title){
        Article.findOne({title:title},{},{ sort: { 'create' : -1 } }, function(err,article){
          all.push(article);
          count ++;
          if (count == titles.length)
            res.send(all);
        });
      });
    }
  });
}