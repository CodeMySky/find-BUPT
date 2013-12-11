
/*
 * GET home page.
 */
var Article = require("../models/article");

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.article = function(req,res){
  var request = req.params.request;
  Article.get(request,function(err,article){
    if (err) res.end(err);
    //if (!article) res.end("NO "+request+" FOUND!");
    res.end(JSON.stringify(article));
  });
}

exports.updateArticle = function(req,res){
  var request = req.params.request;
  var article = req.body;
  article.create = new Date();
  article = new Article(article);
  article.save(function(err){
    if (err) res.end(err);
    res.end("success");
  })
}