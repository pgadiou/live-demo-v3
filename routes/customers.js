const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { orders } = require('../models');
const exportCustomerOrdersAsCSV = require('../utils/csv-exporter');


const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('customers');

// This file contains the logic of every route in Forest Admin for the collection customers:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Customer
router.post('/customers', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Customer
router.put('/customers/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  // example of smart field with validation in backend
  if (request.body.data.attributes['must-be-kuku'] !== 'kuku') {
    return response.status(403).send('should have been kuku!');
  }
  next();
});

// Delete a Customer
router.delete('/customers/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Customers
router.get('/customers', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a Customer
router.get('/customers/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Customers
router.get('/customers.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Customers
router.delete('/customers', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

router.post('/actions/export-orders-as-csv', permissionMiddlewareCreator.smartAction(), async (req, res) => {
  // Get the current record id
  const recordId = req.body.data.attributes.ids[0];
  // get an array of records that are the orders of the customer
  const data = await orders.find({ customer: recordId });

  return exportCustomerOrdersAsCSV(res, data);
});


module.exports = router;
