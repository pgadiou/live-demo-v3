const express = require('express');
const { PermissionMiddlewareCreator, RecordsGetter, RecordCreator, RecordUpdater } = require('forest-express-sequelize');
const { companies } = require('../models');
const liana = require('forest-express-sequelize');
const parseDataUri = require('parse-data-uri');
const models = require('../models');
const uuid = require('uuid/v4');
const S3Helper = require('../services/s3-helper');
const P = require('bluebird');


const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('companies');

// This file contains the logic of every route in Forest Admin for the collection companies:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Company
router.post('/companies', permissionMiddlewareCreator.create(), (request, response, next) => {
  next();
});

// Update a Company
router.put('/companies/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  next();
});

// Delete a Company
router.delete('/companies/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Companies
router.get('/companies', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a number of Companies
router.get('/companies/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Company
router.get('/companies/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Companies
router.get('/companies.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Companies
router.delete('/companies', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

function uploadLegalDoc(companyId, doc, field) {
  const id = uuid();

  return new S3Helper().upload(doc, `livedemo/legal/${id}`)
    .then(() => companies.findByPk(companyId))
    .then((company) => {
      company[field] = id;
      return company.save();
    })
    .catch((e) => e);
}

router.post('/actions/upload-legal-docs', permissionMiddlewareCreator.smartAction(), (req, res) => {
  // Get the current company id
  const companyId = req.body.data.attributes.ids[0];

  // Get the values of the input fields entered by the admin user.
  const attrs = req.body.data.attributes.values;
  const certificateOfIncorporation = attrs['Certificate of Incorporation'];
  const passportId = attrs['Valid proof of ID'];

  P.all([
    uploadLegalDoc(companyId, certificateOfIncorporation, 'certificateOfIncorporationId'),
    uploadLegalDoc(companyId, passportId, 'passportId'),
  ])
    .then(() => {
      // Once the upload is finished, send a success message to the admin user in the UI.
      return res.send({ success: 'Legal documents are successfully uploaded.' });
    });
});

module.exports = router;
