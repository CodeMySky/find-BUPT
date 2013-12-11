var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  create: Date
});

var Article = mongoose.model('article', articleSchema);

module.exports = Article;

Article.get = function(request,callback){
  console.log(request);
  Article.findOne({title:request},{},{ sort: { 'create' : -1 } },function(err,docs){
    //if (err) callback(err,null);
    //if (!docs){return callback(null,null);}
    console.log(docs);
    console.log(err);
    return callback(err,docs);
  });
}