var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  id:Number,
  message:String,
  type:String
});

var Message = mongoose.model('message', messageSchema);

module.exports = Message;

Message.get = function(id,callback){
  Message.find({id:id},function(err,docs){
    Message.remove({id:id},function(err){
      console.log(err);
    })
    if (err) return callback(err,null);
    if (!docs) return callback(null,null);
    return callback(err,docs);
  });
}