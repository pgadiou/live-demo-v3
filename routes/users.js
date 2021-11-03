const express = require('express');
const { PermissionMiddlewareCreator, RecordGetter } = require('forest-express-sequelize');
const { users } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('users');

// This file contains the logic of every route in Forest Admin for the collection users:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Transaction
router.post('/users', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

function updateJson(record, formAttributes, jsonField, jsonAttributes) {
  const json = record[jsonField] || {};
  jsonAttributes.forEach((attribute) => {
    json[attribute] = attribute in formAttributes ? formAttributes[attribute] : json[attribute];
    // json[attribute] = formAttributes[attribute] || json[attribute];
  });
  return json;
}

// Update a User
router.put('/users/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  const recordGetter = new RecordGetter(users);
  const attr = request.body.data.attributes;
  recordGetter.get(request.params.recordId).then((record) => {
    attr.contact = updateJson(record, attr, 'contact', ['email', 'phone']);
    return record.update(attr);
  })
    .then((recordUpdated) => recordGetter.serialize(recordUpdated))
    .then((recordSerialized) => response.send(recordSerialized))
    .catch(next);
});



// Delete a Transaction
router.delete('/users/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Transactions
router.get('/users', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Transactions
router.get('/users/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Transaction
router.get('/users/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Transactions
router.get('/users.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Transactions
router.delete('/users', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
