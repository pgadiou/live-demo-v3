const { RecordSerializer } = require('forest-express-sequelize');
const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/customer_stats', (req, res, next) => {
  const limit = parseInt(req.query.page.size) || 20;
  const offset = (parseInt(req.query.page.number) - 1) * limit;
  const queryType = models.sequelize.QueryTypes.SELECT;
  let conditionSearch = '';

  // I think we should drop this for the doc, it is not related to helpers
  if (req.query.search) {
    conditionSearch = `customers.email LIKE '%${req.query.search.replace(/\'/g, '\'\'')}%'`;
  }

  const queryData = `
    SELECT customers.id,
      customers.email,
      count(orders.*) AS orders_count,
      sum(products.price) AS total_amount,
      customers.created_at,
      customers.updated_at
    FROM customers
    JOIN orders ON customers.id = orders.customer_id
    JOIN products ON orders.product_id = products.id
    ${conditionSearch ? `WHERE ${conditionSearch}` : ''}
    GROUP BY customers.id
    ORDER BY customers.id
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const queryCount = `
    SELECT COUNT(*)
    FROM customers
    WHERE
      EXISTS (
        SELECT *
        FROM orders
        WHERE orders.customer_id = customers.id
      )
      ${conditionSearch ? `AND ${conditionSearch}` : ''}
  `;

  Promise.all([
    models.sequelize.query(queryData, { type: queryType }),
    models.sequelize.query(queryCount, { type: queryType }),
  ])
    .then(async ([customerStatsList, customerStatsCount]) => {
      // customerStatsList.map((record) => {
      //   record.customer = {
      //     id: record.id,
      //   };
      //   return record;
      // });
      const customerStatsSerializer = new RecordSerializer({ name: 'customer_stats' });
      const customerStats = await customerStatsSerializer.serialize(customerStatsList);
      const count = customerStatsCount[0].count;
      res.send({ ...customerStats, meta:{ count: count }});
    })
    .catch((err) => next(err));
});

module.exports = router;