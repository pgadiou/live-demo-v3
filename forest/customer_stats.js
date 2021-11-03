const { collection } = require('forest-express-sequelize');

collection('customer_stats', {
  // isSearchable: true,
  fields: [{
    field: 'id',
    type: 'Number',
  },{
    field: 'customer',
    type: 'String',
    reference: 'customers.email',
  }, {
    field: 'orders_count',
    type: 'Number',
    // isSortable: true,
    // isFilterable: true,

  }, {
    field: 'total_amount',
    type: 'Number',
  }],
});
