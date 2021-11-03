const { collection } = require('forest-express-sequelize');
const models = require('../models');

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('reviews', {
  actions: [],
  fields: [
    // {
  //   field: 'customer',
  //   type: 'String',
  //   reference: 'customers.id',
  //   get: function (review) {
  //     console.log(review)
  //     return models.customers
  //       .findAll({
  //         include: [{
  //           model: models.orders,
  //           where: { ref: review.orderRefKey },
  //           as: 'orders',
  //           include: [{
  //             model: models.reviews,
  //             where: { id: review.id },
  //             as: 'orderRefReviews',
  //           }],
  //         }],
  //       })
  //       .then((customers) => {
  //         if (customers) { return customers[0]; }
  //       });
  //   },
  // },
  ],
  segments: [],
});
