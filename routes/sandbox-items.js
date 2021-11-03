const express = require('express');
const { PermissionMiddlewareCreator, RecordGetter } = require('forest-express-sequelize');
const { sandboxItems } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('sandboxItems');

// This file contains the logic of every route in Forest Admin for the collection sandboxItems:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Sandbox Item
router.post('/sandboxItems', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

function updateJson(record, formAttributes, jsonField, jsonAttributes) {
  const json = record[jsonField] ? record[jsonField] : {};
  jsonAttributes.forEach((attribute) => {
    json[attribute] = attribute in formAttributes ? formAttributes[attribute] : json[attribute];
  });
  return json;
}

// Update a Sandbox Item
router.put('/sandboxItems/:recordId', permissionMiddlewareCreator.update(), async (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  // const attr = request.body.data.attributes;
  // if ('lon' in attr || 'lat' in attr) {
  //   const recordGetter = new RecordGetter(sandboxItems);
  //   const record = await recordGetter.get(request.params.recordId);
  //   const json = record.json ? record.json : {};
  //   json.lat = 'lat' in attr ? attr.lat : json.lat;
  //   json.lon = 'lon' in attr ? attr.lon : json.lon;
  //   record.json = json;
  //   await record.save();
  // }
  // next();

  const recordGetter = new RecordGetter(sandboxItems);
  const attr = request.body.data.attributes;
  const record = await recordGetter.get(request.params.recordId);
  attr.json = updateJson(record, attr, 'json', ['lat', 'lon']);
  attr.child = updateJson(record, attr, 'child', ['name', 'age', 'sex']);
  return record.update(attr)
    .then((recordUpdated) => recordGetter.serialize(recordUpdated))
    .then((recordSerialized) => response.send(recordSerialized))
    .catch(next);
});

// Delete a Sandbox Item
router.delete('/sandboxItems/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Sandbox Items
router.get('/sandboxItems', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Sandbox Items
router.get('/sandboxItems/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Sandbox Item
router.get('/sandboxItems/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Sandbox Items
router.get('/sandboxItems.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Sandbox Items
router.delete('/sandboxItems', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
