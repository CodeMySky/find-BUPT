var mongoose = require('mongoose');
var Converter = require("../Markdown.Converter").Converter,
    conv = new Converter();
var articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  create: Date,
  lng: Number,
  lat: Number
});

var Article = mongoose.model('article', articleSchema);

module.exports = Article;

Article.get = function(request,callback){
  Article.findOne({title:request},{},{ sort: { 'create' : -1 } },function(err,docs){
    if (err) return callback(err,null);
    if (!docs) return callback(null,null);
    console.log(docs.article);
    docs.content = conv.makeHtml(docs.content); 
    return callback(err,docs);
  });
}
Article.getRaw = function(request,callback){
  Article.findOne({title:request},{},{ sort: { 'create' : -1 } },function(err,docs){
    if (err) return callback(err,null);
    if (!docs) return callback(null,null);
    return callback(err,docs);
  });
}