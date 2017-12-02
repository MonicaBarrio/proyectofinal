'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
  name: {
    type: String,
    required: 'Nombre del producto requerido'
  },
  price: {
	type: Number,
	default: 0
  },
  description:{ 
  	type: String,
  	required: 'Desripcion requerida'
  }  ,
  images:{ 
  	type: String
  },
  stock: {
	type: Number,
	default: 0
  }
});



module.exports = mongoose.model('Products', ProductsSchema);
