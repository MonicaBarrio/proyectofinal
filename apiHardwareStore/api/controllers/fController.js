'use strict';


var mongoose = require('mongoose'),
  products = mongoose.model('Products');

exports.list_all_products = function(req, res) {
  products.find({}, function(err, products) {
    if (err)
      res.send(err);
    res.json(products);
  });
};

exports.create_a_products = function(req, res) {
  var new_products = new products();
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
  });
};


exports.delete_a_products = function(req, res) {


  products.remove({
    _id: req.params.productsId
  }, function(err, products) {
    if (err)
      res.send(err);
    res.json({ message: 'products successfully deleted' });
  });
};