'use strict';


var mongoose = require('mongoose'),
  products = mongoose.model('Products'),
  alog = mongoose.model('Log'),
  user = mongoose.model('User'),
  buy  = mongoose.model('Buy');

exports.check_user = function(req, res) {
  user.find({}, function(err, actions) {
    if (err)
      res.send(err);
    res.json(actions);
  });
};

exports.create_a_user = function(req, res) {
  var new_user = new user();

  new_user.username  = req.body.username;
  new_user.password = req.body.password;
  new_user.tipo = 'user';


  new_user.save(function(err,user) {
    if (err)
      res.send(err);
    res.json(user);
    console.log(user);

    var nalog = new alog();
    nalog.idUser =  user._id ;
    nalog.name   =  user.username ;
    nalog.oper   = 'post';
    nalog.item   = user;
    nalog.save(function(err, products) {});

  });
};

exports.list_all_products = function(req, res) {
  products.find({}, function(err, products) {
    if (err)
      res.send(err);
    res.json(products);
  });
};

exports.list_all_actions = function(req, res) {
  alog.find({}, function(err, actions) {
    if (err)
      res.send(err);
    res.json(actions);
  });
};

exports.create_a_products = function(req, res) {
  var new_products = new products();
 console.log('req: ',req.params); 
console.log('cuerpo: ',req.body);

  new_products.name  = req.body.name;
  new_products.price = req.body.price;
  new_products.description = req.body.description;
  new_products.images = req.body.images;
  new_products.stock = req.body.stock;

  new_products.save(function(err, products) {
    if (err)
      res.send(err);
    res.json(products);

    var nalog = new alog();
    nalog.idUser = req.params.uid;
    nalog.name   = req.params.uname;
    nalog.oper   = 'post';
    nalog.item   = products;
    nalog.save(function(err, products) {});

  });
};

exports.new_buy = function(req, res) {
  var newBuy = new buy();


  newBuy.prodId  = req.body.prodId;
  newBuy.quantity = req.body.quantity;
  newBuy.creditCard = req.body.creditCard;
  newBuy.ccCode = req.body.ccCode;
  newBuy.date = req.body.date;

  newBuy.save(function(err, buy) {
    if (err)
      res.send(err);
    res.json(buy);

    var nalog = new alog();
    nalog.idUser = req.params.uid;
    nalog.name   = req.params.uname;
    nalog.oper   = 'post';
    nalog.item   = newBuy;
    nalog.save(function(err, products) {});

  });
};


exports.read_a_products = function(req, res) {
  products.findById(req.params.productsId, function(err, products) {
    if (err)
      res.send(err);
    res.json(products);
  });
};


exports.update_a_products = function(req, res) {
  products.findOneAndUpdate({_id: req.params.productsId}, req.body, {new: true}, function(err, products) {
    if (err)
      res.send(err);
    res.json(products);
    console.log("edit");
    console.log(req.body);
    var nalog = new alog();
    nalog.idUser = req.params.uid;
    nalog.name   = req.params.uname;
    nalog.oper   = 'put';
    nalog.item   = JSON.stringify(req.body);
    nalog.save(function(err, nlog) {
      console.log("result");
      console.log(nlog);
    });
  });
};


exports.delete_a_products = function(req, res) {
  var prod = req.params.productsId;
  console.log("prod: "+ prod);
  products.findById(prod, function(err, product) {
    if (err)
      res.send(err);
    console.log("res: "+product);
    prod = product;
    products.remove({
    _id: req.params.productsId
  }, function(err, products) {
    if (err)
      res.send(err);
    res.json({ message: 'products successfully deleted' });
    var nalog = new alog();
    nalog.idUser = req.params.uid;
    nalog.name   = req.params.uname;
    nalog.oper   = 'delete';
    nalog.item   = prod;
    nalog.save(function(err, products) {});
  });
  });
  
};