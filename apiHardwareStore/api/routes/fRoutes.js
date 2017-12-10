'use strict';
module.exports = function(app) {
  var fgemprod = require('../controllers/fController');

  // fgemprod Routes
  app.route('/api/fprod')
    .get(fgemprod.list_all_products);

  app.route('/api/fprodAdd/:uname/:uid')  
    .post(fgemprod.create_a_products);

    app.route('/api/fprodAddBuy/:uname/:uid')  
    .post(fgemprod.new_buy);


  app.route('/api/fprod/:productsId')
    .get(fgemprod.read_a_products);

  app.route('/api/fprod/:productsId/:uname/:uid')
    .put(fgemprod.update_a_products)
    .delete(fgemprod.delete_a_products);

  app.route('/api/sadmin/actions')
    .get(fgemprod.list_all_actions);

  app.route('/api/login/')
    .get(fgemprod.check_user)
    .post(fgemprod.create_a_user);

};