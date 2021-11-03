const express = require('express');
const { PermissionMiddlewareCreator, RecordSerializer } = require('forest-express-sequelize');
const { companies, transactions } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('transactionsInfo');
const recordSerializer = new RecordSerializer({ name: 'transactionsInfo' });

router.get('/transactionsInfo', permissionMiddlewareCreator.list(), async (request, response, next) => {
  // get the current record from the id entered as an input
  let company = null;
  try {
    company = await companies.findByPk(request.query.search);
  } catch (error) {
    return {};
  }
  // based on the record, trigger the logic to build the selection to be proposed
  // here we get info from the related transactions and build transactionsInfo records from them
  const companyTransactions = await transactions.findAll({
    where: { beneficiary_company_id: company.id },
  });
  const selection = [];
  companyTransactions.forEach((transaction) => {
    const record = {
      id: transaction.id,
      info: `ref ${transaction.reference} - amount ${transaction.amount} USD`,
    };
    selection.push(record);
  });
  return recordSerializer.serialize(selection)
    .then((recordsSerialized) => {
      response.send(recordsSerialized);
    });
});

module.exports = router;
