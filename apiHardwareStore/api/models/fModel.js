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

var LogSchema = new Schema({
  idUser: {
    type: String
  },
  name: {
  type: String
  },
  oper:{ 
    type: String
  }  ,
  item:{ 
    type: String
  }
});
module.exports = mongoose.model('Log', LogSchema);

var UserSchema = new Schema({

  username: {
  type: String
  },
  password:{ 
    type: String
  }  ,
  tipo:{ 
    type: String
  }
});
module.exports = mongoose.model('User', UserSchema);

var BuySchema = new Schema({

  prodId: {
  type: String
  },
  quantity:{ 
    type: Number
  },
  creditCard:{ 
    type: String
  },
  ccCode:{ 
    type: String
  } ,
  date:{ 
    type: String
  }
});
module.exports = mongoose.model('Buy', BuySchema);