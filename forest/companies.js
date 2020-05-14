const { collection } = require('forest-express-sequelize');

collection('companies', {
  actions: [
    {
      name: 'Upload Legal Docs',
      type: 'single',
      fields: [{
        field: 'Certificate of Incorporation',
        description: 'The legal document relating to the formation of a company or corporation.',
        type: 'File',
        isRequired: true,
      }, {
        field: 'Valid proof of ID',
        description: 'ID card or passport if the document has been issued in the EU, EFTA, or EEA / ID card or passport + resident permit or driving licence if the document has been issued outside the EU, EFTA, or EEA of the legal representative of your company',
        type: 'File',
        isRequired: true,
      }],
    },
  ],
  fields: [],
  segments: [],
});
