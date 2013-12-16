var mongoose = require('mongoose');

var subscribeSchema = new mongoose.Schema({
  uid:Number,
  title:String
});

var Subscribe = mongoose.model('subscribe', subscribeSchema);

module.exports = Subscribe;

Subscribe.get = function(title,callback){
  Subscribe.find({title:title},function(err,docs){
    if (err) return callback(err,null);
    if (!docs) return callback(null,null);
    return callback(err,docs);
  });
}