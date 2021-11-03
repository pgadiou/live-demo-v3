const { collection } = require('forest-express-sequelize');
const models = require('../models');
const { Op } = models.Sequelize;

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('customers', {
  actions: [
    {
      name: 'Restricted action',
      type: 'single',
    },
    {
      name: 'Export orders as CSV',
      type: 'single',
    },
  ],
  fields: [
    // smart belongs to relationship to smart collection
    {
      field: 'customerStats',
      type: 'Number',
      reference: 'customer_stats.id', // reference to Smart Collection here
      get(customer) {
        return { id: customer.id };
      },
    },
    // smart field that returns number of orders (useful for smart segment below)
    {
      field: 'ordersNumber',
      type: 'Number',
      defaultValue: 2,
      get(customer) {
        return models.orders
          .count({ where: { customer_id: customer.id } })
          .then((nb) => nb);
      },
    },
    // example of field with validation in the backend
    {
      field: 'must-be-kuku',
      type: 'String',
      get (customer) {
        return 'kuku';
      },
      set (customer, value) {
        console.log('here');
      },
    },
  ],
  // smart segment that applies to a smart field dynamically
  segments: [
    {
      name: 'Customers with orders',
      where: (query) => {
        console.log("STOPPPPPP", query);
        if (query.filters) {
          const recordId = JSON.parse(query.filters).value;
          return models.orders
            .count({ where: { customer_id: recordId } })
            .then((number) => {
              if (number > 0) {
                return { id: { [Op.in]: [recordId] } };
              }
              return { id: { [Op.in]: [null] } };
            });
        }
        return { id: { [Op.in]: [null] } };
      },
    },
  ],
});
