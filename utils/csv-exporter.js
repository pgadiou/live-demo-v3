const { Parser, transforms: { unwind } } = require('json2csv');

function exportCustomerOrdersAsCSV(response, data) {
  // set the response header to tell the browser to expect a csv
  response.setHeader('Content-Type', 'text/csv');
  response.setHeader('Content-Disposition', 'attachment; filename=intermediates-export.csv');
  response.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  // list the fields of the orders that you want to display as columns of the csv
  const fields = [
    'ref',
    'shippingStatus',
    'createdAt',
    'UpdatedAt',
    'beingProcessedAt',
    'readyForShippingAt',
    'inTransitAt',
    'shippedAt',
  ];

  // initialize the parser
  const json2csvParser = new Parser({ fields });
  // convert the array of records into a csv
  try {
    const csv = json2csvParser.parse(data);
    return response.send(csv);
  } catch (err) {
    return response.status(500).json({ err });
  }
}

module.exports = exportCustomerOrdersAsCSV;