
/*
 * GET home page.
 */
var Article = require("../models/article");
var Message = require("../models/message");
var Subscribe = require("../models/subscriber");
var http = require('https');
exports.index = function(req, res){
  console.log(res.locals.user);
  res.render('index', { title: 'Express',user:res.locals.user});
};
exports.message = function(req,res){
  var id = req.session.uid;
  Message.get(id,function(err,msg){
    if (msg){
      res.send(msg);
    }else{
      res.send([]);
    }
  });
}
exports.history = function(req,res){
  var request = req.params.request;
  Article.find({title:request},function(err,docs){
    if (err) return res.send(err);
    res.send(docs);
  });
}
exports.article = function(req,res){
  var request = req.params.request;
  Article.get(request,function(err,article){
    if (err) res.end(err);
    if (!article) res.redirect("edit/"+request);
    res.render('article',{a:article,user:req.session.user,id:req.session.uid});
  });
}
exports.subscribe = function(req,res){
  if (!req.query.uid) return "not login";
  subscribe = new Subscribe(req.query);
  subscribe.save(function(err){
    if (err) return res.send(err);
    res.send("OK");
  });
}
exports.updateArticle = function(req,res){
  var request = req.params.request;
  var article = req.body;
  article.create = new Date();
  article = new Article(article);
  article.save(function(err,a){
    if (err) res.send(err);
    else{
      Subscribe.get(request, function(err,docs){
        for (i=0;i<docs.length;i++){
          var message = new Message({id:docs[i].uid,message:"您订阅的"+request+"被修改了"});
          message.save();
        }
      });
      res.send("ok");
    }
  })
}
exports.edit = function(req,res){
  var request = req.params.request;
  /*if (!req.session.uid){
    return res.render('index',{info:"尚未登录"});
  }*/
  Article.getRaw(request,function(err,article){
    if (err) res.end(err);
    if (!article) article={title:request,content:"",lng:116.36384,lat:39.966967};
    res.render('edit',{a:article});
  });
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
          req.session.user = user.name;
          req.session.uid = user.social_uid;
          console.log(req.session.uid);
          var msg = new Message({id:user.social_uid,message:"登录成功",type:"success"});
          msg.save();
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