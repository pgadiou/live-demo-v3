const express = require('express');
const { PermissionMiddlewareCreator, RecordsGetter } = require('forest-express-sequelize');
const { products, customers, orders } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('products');

// This file contains the logic of every route in Forest Admin for the collection products:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Product
router.post('/products', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Product
router.put('/products/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Product
router.delete('/products/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Products
router.get('/products', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Products
router.get('/products/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Product
router.get('/products/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Products
router.get('/products.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Products
router.delete('/products', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

router.get('/products/:product_id/relationships/buyers', (request, response, next) => {
  const productId = request.params.product_id;
  const limit = parseInt(request.query.page.size, 10) || 20;
  const offset = (parseInt(request.query.page.number, 10) - 1) * limit;
  const recordsGetter = new RecordsGetter(customers);
  const include = [{
    model: orders,
    as: 'orders',
    where: { product_id: productId },
  }];

  // find the customers for the requested page and page size
  const findAll = customers.findAll({
    include,
    offset,
    limit,
  });

  // count all customers for pagination
  const count = customers.count({ include });

  // resolve the two promises and serialize the response
  Promise.all([findAll, count])
    .then(([customersFound, customersCount]) => recordsGetter.serialize(customersFound, { count: customersCount }))
    .then((recordsSerialized) => response.send(recordsSerialized))
    .catch(next);
});

module.exports = router;
