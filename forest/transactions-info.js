const { collection } = require('forest-express-sequelize');

collection('transactionsInfo', {
  fields: [{
    field: 'id',
    type: 'Number',
  }, {
    field: 'info',
    type: 'String',
  }],
});
