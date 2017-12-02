'use strict';
module.exports = function(app) {
  var fgemprod = require('../controllers/fController');

  // fgemprod Routes
  app.route('/api/fprod')
    .get(fgemprod.list_all_products)
    .post(fgemprod.create_a_products);


  app.route('/api/fprod/:productsId')
    .get(fgemprod.read_a_products)
    .put(fgemprod.update_a_products)
    .delete(fgemprod.delete_a_products);
};